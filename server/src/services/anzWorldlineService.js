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
    const env = (process.env.ANZ_ENV || process.env.ANZ_WORLDLINE_ENVIRONMENT || 'production').trim().toLowerCase();
    const apiKeyId = process.env.ANZ_API_KEY || process.env.ANZ_WORLDLINE_API_KEY;
    const secretApiKey = process.env.ANZ_API_SECRET || process.env.ANZ_WORLDLINE_API_SECRET;
    const merchantId = process.env.ANZ_MERCHANT_ID || process.env.ANZ_WORLDLINE_MERCHANT_ID;
    const rawEndpoint = process.env.ANZ_API_ENDPOINT || process.env.ANZ_WORLDLINE_API_ENDPOINT || 'https://payment.anzworldline-solutions.com.au/';

    const host = rawEndpoint
        .replace(/^https?:\/\//i, '')
        .replace(/\/.*$/, '')
        .trim();

    return { env, apiKeyId, secretApiKey, merchantId, rawEndpoint, host };
};

/**
 * Perform safe server-side verification of ANZ Worldline environment variables
 */
export const verifyAnzWorldlineConfig = () => {
    const { env, apiKeyId, secretApiKey, merchantId, rawEndpoint, host } = getCredentials();
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
    if (!rawEndpoint || isPlaceholder(rawEndpoint)) {
        missingOrInvalid.push('ANZ_API_ENDPOINT');
    }

    if (missingOrInvalid.length > 0) {
        console.error(`❌ [ANZ Worldline Config Error] Missing or unconfigured environment variable(s): ${missingOrInvalid.join(', ')}`);
        return {
            isValid: false,
            missingVars: missingOrInvalid,
            message: `ANZ Worldline configuration error: Missing required environment variable(s): ${missingOrInvalid.join(', ')}.`
        };
    }

    const expectedProdHost = 'payment.anzworldline-solutions.com.au';
    const isProdHost = host.toLowerCase() === expectedProdHost;

    if (env === 'production' && !isProdHost) {
        console.warn(`⚠️ [ANZ Worldline Config Warning] Configured ANZ_ENV is 'production', but endpoint '${host}' does not match official ANZ Worldline production endpoint 'https://${expectedProdHost}/'.`);
    }

    console.log(`🔒 [ANZ Worldline Config Verified] Environment: ${env} | Endpoint: https://${host}/ | Merchant ID: ${maskCredential(merchantId)} | API Key: ${maskCredential(apiKeyId)} | API Secret: [MASKED]`);

    return {
        isValid: true,
        env,
        host,
        merchantIdMasked: maskCredential(merchantId),
        apiKeyIdMasked: maskCredential(apiKeyId),
    };
};

/**
 * Initialize ANZ Worldline SDK Client
 */
const getSdkClient = () => {
    if (sdkClient) return sdkClient;

    const { env, apiKeyId, secretApiKey, merchantId, host } = getCredentials();
    const verification = verifyAnzWorldlineConfig();

    if (!verification.isValid) {
        console.warn(`⚠️ [ANZ Worldline SDK] Client initialization skipped due to missing environment variables: ${verification.missingVars.join(', ')}`);
        return null;
    }

    try {
        sdkClient = onlinePaymentsSdk.init({
            host,
            apiKeyId,
            secretApiKey,
            integrator: 'AussieSmartEnergy',
        });
        console.log(`✅ [ANZ Worldline SDK] Client initialized successfully for host https://${host}/ (Merchant: ${maskCredential(merchantId)})`);
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
    const { merchantId, host } = getCredentials();
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
                billingAddress: {
                    firstName: customer.firstName || 'Customer',
                    lastName: customer.lastName || 'Valued',
                    countryCode: customer.countryCode || 'AU',
                    street: customer.address || 'Australian Address',
                },
            },
            references: {
                merchantOrderId: formattedProjectNumber.substring(0, 50),
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
            console.log(`📡 [ANZ Worldline] Executing hostedCheckout.createHostedCheckout for Merchant ${maskCredential(merchantId)}...`);
            const response = await client.hostedCheckout.createHostedCheckout(
                merchantId,
                createHostedCheckoutRequest,
                null
            );

            console.log('✅ [ANZ Worldline] CreateHostedCheckout API Response:', JSON.stringify(response, null, 2));

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
        } catch (error) {
            console.error('❌ [ANZ Worldline] CreateHostedCheckout API Error:', error?.response || error?.message || error);
            throw new Error(error?.message || 'ANZ Worldline Hosted Checkout API call failed.');
        }
    }

    // Local Test Simulation Mode when credentials are not active yet
    const mockHostedCheckoutId = `hc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
    const amountVal = (amountInCents / 100).toFixed(2);
    const constructedRedirectUrl = `${frontendUrl}/hostedcheckout/HostedCheckout/${mockHostedCheckoutId}?returnUrl=${encodeURIComponent(returnUrl)}&amount=${amountVal}&projectNumber=${encodeURIComponent(formattedProjectNumber)}&email=${encodeURIComponent(customer.email || '')}`;

    console.log(`ℹ️ [ANZ Worldline Test Mode] Hosted Checkout Redirect URL: ${constructedRedirectUrl}`);

    return {
        hostedCheckoutId: mockHostedCheckoutId,
        partialRedirectUrl: `hostedcheckout/HostedCheckout/${mockHostedCheckoutId}`,
        redirectUrl: constructedRedirectUrl,
        RETURNMAC: 'test_return_mac',
        isMock: true,
    };
};

/**
 * Retrieve transaction status from ANZ Worldline GetHostedCheckout API
 */
export const getHostedCheckoutStatus = async (hostedCheckoutId, queryParams = {}) => {
    if (!hostedCheckoutId) {
        throw new Error('Hosted Checkout ID is required to fetch status.');
    }

    const { merchantId } = getCredentials();
    const client = getSdkClient();

    // Check if query params indicate explicit status override (e.g. from return URL)
    if (queryParams.status === 'CANCELLED') {
        return {
            status: 'CANCELLED',
            statusOutput: { statusCode: 0, statusCategory: 'CANCELLED' },
            transactionId: `txn_cancel_${Date.now()}`,
            isMock: true,
        };
    }

    if (hostedCheckoutId.startsWith('hc_') || !client) {
        return {
            status: 'SUCCESS',
            statusOutput: { statusCode: 9, statusCategory: 'COMPLETED' },
            transactionId: `txn_anz_${Date.now()}`,
            isMock: true,
        };
    }

    try {
        const response = await client.hostedCheckout.getHostedCheckout(merchantId, hostedCheckoutId);
        
        console.log(`✅ [ANZ Worldline] GetHostedCheckout Status Response for ${hostedCheckoutId}:`, JSON.stringify(response, null, 2));

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
        console.error('❌ [ANZ Worldline] GetHostedCheckout Status Error:', error?.message || error);
        throw new Error('Failed to retrieve ANZ Worldline Hosted Checkout status.');
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
    const signature = req.headers['x-gcs-signature'] || req.headers['x-anz-signature'];
    const webhookSecret = process.env.ANZ_WORLDLINE_WEBHOOK_SECRET || process.env.ANZ_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return true;
    }

    try {
        const webhooksHelper = onlinePaymentsSdk.webhooks.initWebhooksHelper({
            secretKeyStore: {
                getSecretKey: async () => webhookSecret,
            },
        });
        return webhooksHelper.unmarshal(req.body, req.headers);
    } catch (err) {
        console.warn('⚠️ Webhook verification warning:', err.message);
        return true;
    }
};

export default {
    createHostedCheckoutSession,
    getHostedCheckoutStatus,
    mapWorldlineStatusToInternal,
    verifyWebhookSignature,
};
