require('dotenv').config();
const crypto = require('crypto');

const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "mysecret123"; // Add default

console.log("RAZORPAY_WEBHOOK_SECRET:", secret); // Debugging

if (!secret) {
    console.error("❌ ERROR: RAZORPAY_WEBHOOK_SECRET is undefined!");
    process.exit(1);
}

const webhookPayload = JSON.stringify({
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_29QQoUBi66xm2f",
        "amount": 50000,
        "currency": "INR",
        "status": "captured",
        "order_id": "order_DBJOWzybf0sJbb",
        "method": "netbanking",
        "created_at": 1607507898
      }
    }
  }
});

// Generate HMAC SHA256 signature
const generatedSignature = crypto
  .createHmac('sha256', secret)
  .update(webhookPayload)
  .digest('hex');

console.log("✅ Generated Signature:", generatedSignature);
