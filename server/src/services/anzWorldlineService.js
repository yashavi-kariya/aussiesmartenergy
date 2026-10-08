import onlinePaymentsSdk from 'onlinepayments-sdk-nodejs';

/**
 * ANZ Worldline Solutions Payment Gateway Service
 * Integrates ANZ Worldline Hosted Checkout Page (CreateHostedCheckout) and Status verification APIs.
 * Official Docs: https://docs.anzworldline-solutions.com.au/en/integration/basic-integration-methods/hosted-checkout-page
 */

let sdkClient = null;

/**
 * Mask credential string for safe diagnostic logging
 */
export const maskCredential = (val) => {
    if (!val) return '[NOT CONFIGURED]';
    const trimmed = String(val).trim();
    if (trimmed.length <= 8) return '****';
    return `${trimmed.substring(0, 4)}...${trimmed.substring(trimmed.length - 4)}`;
};

export const isPlaceholder = (val) => {
    if (!val) return true;
    const lower = String(val).trim().toLowerCase();
    return (
        lower === '' ||
        lower === 'your_anz_api_key' ||
        lower === 'your_api_key_id' ||
        lower === 'your_api_key_here' ||
        lower === 'sandbox_api_key' ||
        lower === 'your_merchant_id' ||
        lower === 'your_merchant_id_here' ||
        lower === 'sandbox_merchant_id' ||
        lower === 'your_anz_merchant_id' ||
        lower === 'your_secret_api_key' ||
        lower === 'your_api_secret_here' ||
        lower === 'sandbox_api_secret' ||
        lower === 'your_anz_api_secret'
    );
};

export const getCredentials = () => {
    const paymentMode = (process.env.PAYMENT_MODE || '').trim().toLowerCase();
    const env = (
        process.env.ANZ_ENV ||
        process.env.ANZ_ENVIRONMENT ||
        process.env.ANZ_WORLDLINE_ENVIRONMENT ||
        (paymentMode === 'production' ? 'production' : 'sandbox')
    ).trim().toLowerCase();

    const apiKeyId = process.env.ANZ_API_KEY || process.env.ANZ_WORLDLINE_API_KEY;
    const secretApiKey = process.env.ANZ_API_SECRET || process.env.ANZ_WORLDLINE_API_SECRET;
    const merchantId = process.env.ANZ_MERCHANT_ID || process.env.ANZ_WORLDLINE_MERCHANT_ID;

    const isProd = env === 'production' || env === 'prod' || paymentMode === 'production';
    const isSimulation = paymentMode === 'simulation' && !isProd;

    const defaultEndpoint = isProd
        ? 'payment.anzworldline-solutions.com.au'
        : 'payment.preprod.anzworldline-solutions.com.au';

    const configuredEndpoint = process.env.ANZ_API_ENDPOINT || process.env.ANZ_WORLDLINE_API_ENDPOINT;
    let rawEndpoint = configuredEndpoint ? configuredEndpoint : defaultEndpoint;

    const host = rawEndpoint
        .replace(/^https?:\/\//i, '')
        .replace(/\/.*$/, '')
        .trim();

    return { env, paymentMode, isProd, isSimulation, apiKeyId, secretApiKey, merchantId, rawEndpoint, host };
};

/**
 * Perform safe server-side verification of ANZ Worldline environment variables
 */
export const verifyAnzWorldlineConfig = () => {
    const { env, isProd, isSimulation, apiKeyId, secretApiKey, merchantId, host } = getCredentials();
    const missingOrInvalid = [];

    if (!merchantId || isPlaceholder(merchantId)) {
        missingOrInvalid.push('ANZ_MERCHANT_ID');
    }
    if (!apiKeyId || isPlaceholder(apiKeyId)) {
        missingOrInvalid.push('ANZ_API_KEY');
    }
    if (!secretApiKey || isPlaceholder(secretApiKey)) {
        missingOrInvalid.push('ANZ_API_SECRET');
    }

    if (missingOrInvalid.length > 0) {
        if (isProd) {
            console.error(`❌ [ANZ Worldline Production Error] Missing or unconfigured required production environment variable(s): ${missingOrInvalid.join(', ')}`);
        } else {
            console.warn(`⚠️ [ANZ Worldline Config Notice] Unconfigured environment variable(s): ${missingOrInvalid.join(', ')}.`);
        }
        return {
            isValid: false,
            missingVars: missingOrInvalid,
            message: `ANZ Worldline Gateway Configuration Error: Missing required environment variable(s): ${missingOrInvalid.join(', ')}. Please update server/.env with valid credentials.`
        };
    }

    const expectedProdHost = 'payment.anzworldline-solutions.com.au';
    const isProdHost = host.toLowerCase() === expectedProdHost;

    if (isProd && !isProdHost) {
        console.warn(`⚠️ [ANZ Worldline Config Warning] Production mode active, but endpoint '${host}' does not match official ANZ Worldline production endpoint 'https://${expectedProdHost}/'.`);
    }

    console.log(`🔒 [ANZ Worldline Config Verified] Mode: ${isProd ? 'PRODUCTION' : (isSimulation ? 'SIMULATION' : 'SANDBOX')} | Environment: ${env} | Endpoint: https://${host}/ | Merchant ID: ${maskCredential(merchantId)} | API Key: ${maskCredential(apiKeyId)}`);

    return {
        isValid: true,
        env,
        host,
        isProd,
        merchantIdMasked: maskCredential(merchantId),
        apiKeyIdMasked: maskCredential(apiKeyId),
    };
};

/**
 * Initialize ANZ Worldline SDK Client
 */
const getSdkClient = () => {
    if (sdkClient) return sdkClient;

    const { isProd, apiKeyId, secretApiKey, merchantId, host } = getCredentials();
    const verification = verifyAnzWorldlineConfig();

    if (!verification.isValid) {
        if (isProd) {
            console.error(`❌ [ANZ Worldline SDK] Failed to initialize client in production mode due to unconfigured variables: ${verification.missingVars.join(', ')}`);
        }
        return null;
    }

    try {
        sdkClient = onlinePaymentsSdk.init({
            host,
            apiKeyId,
            secretApiKey,
            integrator: 'AussieSmartEnergy',
        });
        console.log(`✅ [ANZ Worldline SDK] Client initialized for https://${host}/ (Merchant: ${maskCredential(merchantId)})`);
        return sdkClient;
    } catch (err) {
        console.error('❌ [ANZ Worldline SDK] Failed to initialize SDK client:', err.message);
        return null;
    }
};

/**
 * Create Hosted Checkout Session via ANZ Worldline CreateHostedCheckout API
 */
export const createHostedCheckoutSession = async ({
    orderId,
    amountInCents,
    currency = 'AUD',
    returnUrl,
    customer = {},
    packageDetails = {},
    projectNumber = '',
}) => {
    const { isProd, isSimulation, merchantId, host } = getCredentials();
    const verification = verifyAnzWorldlineConfig();

    // In Production mode, configuration MUST be valid
    if (!verification.isValid && !isSimulation) {
        throw new Error(verification.message);
    }

    const client = getSdkClient();

    const formattedProjectNumber = projectNumber || orderId;

    const createHostedCheckoutRequest = {
        order: {
            amountOfMoney: {
                amount: amountInCents,
                currencyCode: currency.toUpperCase(),
            },
            customer: {
                contactDetails: {
                    emailAddress: customer.email || '',
                    phoneNumber: customer.phone || '',
                },
                personalInformation: {
                    name: {
                        firstName: customer.firstName || 'Customer',
                        surname: customer.lastName || 'Valued',
                    },
                },
                billingAddress: {
                    countryCode: customer.countryCode || 'AU',
                    street: customer.address || 'Australian Address',
                },
            },
            references: {
                merchantReference: formattedProjectNumber.substring(0, 50),
            },
        },
        hostedCheckoutSpecificInput: {
            locale: 'en_AU',
            returnUrl,
            showResultPage: false,
        },
    };

    if (process.env.ANZ_TEMPLATE_VARIANT) {
        createHostedCheckoutRequest.hostedCheckoutSpecificInput.variant = process.env.ANZ_TEMPLATE_VARIANT;
    }

    if (client) {
        try {
            console.log(`📡 [ANZ Worldline API] Requesting createHostedCheckout for Merchant ${maskCredential(merchantId)} on host ${host}...`);
            const response = await client.hostedCheckout.createHostedCheckout(
                merchantId,
                createHostedCheckoutRequest,
                null
            );

            console.log('✅ [ANZ Worldline API] CreateHostedCheckout Response:', JSON.stringify(response, null, 2));

            if (response && (response.redirectUrl || response.hostedCheckoutRedirectUrl || response.hostedCheckoutId)) {
                let redirectUrl = response.redirectUrl || response.hostedCheckoutRedirectUrl;
                if (!redirectUrl && response.partialRedirectUrl) {
                    redirectUrl = `https://${host}/${response.partialRedirectUrl.replace(/^\//, '')}`;
                } else if (redirectUrl && !redirectUrl.startsWith('http')) {
                    redirectUrl = `https://${host}/${redirectUrl.replace(/^\//, '')}`;
                }

                return {
                    hostedCheckoutId: response.hostedCheckoutId,
                    partialRedirectUrl: response.partialRedirectUrl || '',
                    redirectUrl,
                    RETURNMAC: response.RETURNMAC || '',
                    isMock: false,
                    raw: response,
                };
            }

            const apiErrMsg = response?.body?.errors?.[0]?.message || response?.body?.errors?.[0]?.id || `ANZ Worldline API Error (Status ${response?.status || 403})`;
            
            // In Production or real API mode, NEVER fall back to simulator
            if (!isSimulation) {
                throw new Error(`ANZ Worldline API Gateway Error: ${apiErrMsg}`);
            }

            console.warn(`⚠️ [ANZ Worldline Development Notice] Gateway returned ${apiErrMsg}. Development simulation active.`);
        } catch (error) {
            console.error('❌ [ANZ Worldline API] CreateHostedCheckout Exception:', error?.response || error?.message || error);
            
            // If NOT explicitly in PAYMENT_MODE=simulation, rethrow the error
            if (!isSimulation) {
                throw new Error(error?.message || 'ANZ Worldline Payment Gateway communication failed.');
            }
        }
    } else if (!isSimulation) {
        // SDK Client is null and not in simulation mode
        throw new Error(`ANZ Worldline Payment Gateway is unavailable. ${verification.message}`);
    }

    // Local Test Simulation Mode - ONLY allowed if PAYMENT_MODE=simulation in local dev
    if (isSimulation) {
        const mockHostedCheckoutId = `hc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
        const amountVal = (amountInCents / 100).toFixed(2);
        const constructedRedirectUrl = `${frontendUrl}/hostedcheckout/HostedCheckout/${mockHostedCheckoutId}?returnUrl=${encodeURIComponent(returnUrl)}&amount=${amountVal}&projectNumber=${encodeURIComponent(formattedProjectNumber)}&email=${encodeURIComponent(customer.email || '')}`;

        console.log(`ℹ️ [Development Simulation Mode] Hosted Checkout Redirect URL: ${constructedRedirectUrl}`);

        return {
            hostedCheckoutId: mockHostedCheckoutId,
            partialRedirectUrl: `hostedcheckout/HostedCheckout/${mockHostedCheckoutId}`,
            redirectUrl: constructedRedirectUrl,
            RETURNMAC: 'test_return_mac',
            isMock: true,
        };
    }

    throw new Error('ANZ Worldline Payment Gateway could not initialize session.');
};

/**
 * Retrieve transaction status from ANZ Worldline GetHostedCheckout API
 */
export const getHostedCheckoutStatus = async (hostedCheckoutId, queryParams = {}) => {
    if (!hostedCheckoutId) {
        throw new Error('Hosted Checkout ID is required to fetch status.');
    }

    const { isSimulation, merchantId } = getCredentials();
    const client = getSdkClient();

    // Query param override & mock check are strictly forbidden unless PAYMENT_MODE=simulation
    if (isSimulation) {
        if (queryParams.status) {
            const qStatus = String(queryParams.status).toUpperCase();
            if (['CANCELLED', 'FAILED', 'SUCCESS', 'PENDING'].includes(qStatus)) {
                return {
                    status: qStatus,
                    statusOutput: { statusCode: qStatus === 'SUCCESS' ? 9 : 0, statusCategory: qStatus },
                    transactionId: `txn_sim_${qStatus.toLowerCase()}_${Date.now()}`,
                    isMock: true,
                };
            }
        }

        if (hostedCheckoutId.startsWith('hc_')) {
            return {
                status: 'SUCCESS',
                statusOutput: { statusCode: 9, statusCategory: 'COMPLETED' },
                transactionId: `txn_sim_${Date.now()}`,
                isMock: true,
            };
        }
    }

    if (!client) {
        throw new Error('ANZ Worldline Gateway client is not configured on backend.');
    }

    try {
        const response = await client.hostedCheckout.getHostedCheckout(merchantId, hostedCheckoutId);
        
        console.log(`✅ [ANZ Worldline API] GetHostedCheckout Status for ${hostedCheckoutId}:`, JSON.stringify(response, null, 2));

        const rawStatus = response.status || response.createdPaymentOutput?.payment?.statusOutput?.status || '';
        const mappedStatus = mapWorldlineStatusToInternal(rawStatus, response);
        const transactionId = response.createdPaymentOutput?.payment?.id || response.paymentId || hostedCheckoutId;

        return {
            status: mappedStatus,
            rawStatus,
            transactionId,
            response,
            isMock: false,
        };
    } catch (error) {
        console.error('❌ [ANZ Worldline API] GetHostedCheckout Error:', error?.message || error);
        throw new Error(`Failed to retrieve ANZ Worldline transaction status: ${error?.message || 'Gateway API unreachable'}`);
    }
};

/**
 * Map ANZ Worldline status strings to internal system payment status
 */
export const mapWorldlineStatusToInternal = (rawStatus, responseObj = {}) => {
    if (!rawStatus) {
        if (responseObj.createdPaymentOutput) return 'SUCCESS';
        return 'PENDING';
    }

    const statusUpper = rawStatus.toUpperCase();

    if (['PAID', 'CAPTURED', 'CAPTURE_REQUESTED', '9', 'PAYMENT_CREATED_SUCCESS', 'COMPLETED'].includes(statusUpper)) {
        return 'SUCCESS';
    }
    if (['CANCELLED', 'CANCELLED_BY_CONSUMER', 'CANCELLED_BY_MERCHANT'].includes(statusUpper)) {
        return 'CANCELLED';
    }
    if (['REJECTED', 'REJECTED_CAPTURE', 'FAILED'].includes(statusUpper)) {
        return 'FAILED';
    }
    if (['REFUNDED', 'REFUND_REQUESTED'].includes(statusUpper)) {
        return 'REFUNDED';
    }
    if (['IN_PROGRESS', 'PAYMENT_CREATED', 'PENDING_PAYMENT', 'WAITING_FOR_PAYMENT'].includes(statusUpper)) {
        return 'PENDING';
    }

    return 'PENDING';
};

/**
 * Verify ANZ Worldline Webhook signature
 */
export const verifyWebhookSignature = (req) => {
    const { isProd } = getCredentials();
    const signature = req.headers['x-gcs-signature'] || req.headers['x-anz-signature'];
    const webhookSecret = process.env.ANZ_WORLDLINE_WEBHOOK_SECRET || process.env.ANZ_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        if (isProd) {
            console.warn('⚠️ [ANZ Webhook Rejected] Missing signature header or secret key in production mode.');
            return false;
        }
        return true;
    }

    try {
        const webhooksHelper = onlinePaymentsSdk.webhooks.initWebhooksHelper({
            secretKeyStore: {
                getSecretKey: async () => webhookSecret,
            },
        });
        webhooksHelper.unmarshal(req.body, req.headers);
        return true;
    } catch (err) {
        console.warn('⚠️ [ANZ Webhook Rejected] Signature verification failed:', err.message);
        return false;
    }
};

export default {
    createHostedCheckoutSession,
    getHostedCheckoutStatus,
    mapWorldlineStatusToInternal,
    verifyWebhookSignature,
};

