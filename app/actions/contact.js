"use server";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContactForm = submitContactForm;
var contact_form_1 = require("@/lib/contact-form");
function getString(formData, key) {
    var value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
}
function buildEmailHtml(values) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>New Contact Inquiry</title>\n</head>\n<body style=\"margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;\">\n  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:40px 16px;\">\n    <tr>\n      <td align=\"center\">\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;\">\n\n          <!-- Header -->\n          <tr>\n            <td style=\"background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;\">\n              <p style=\"margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);\">Sonicverse</p>\n              <h1 style=\"margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;\">New Contact Inquiry</h1>\n            </td>\n          </tr>\n\n          <!-- Body -->\n          <tr>\n            <td style=\"padding:36px 40px;\">\n\n              <!-- Name & Email -->\n              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-bottom:24px;\">\n                <tr>\n                  <td width=\"50%\" style=\"padding-right:12px;vertical-align:top;\">\n                    <p style=\"margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);\">Name</p>\n                    <p style=\"margin:0;font-size:15px;color:#0d1727;font-weight:500;\">".concat(values.name, "</p>\n                  </td>\n                  <td width=\"50%\" style=\"padding-left:12px;vertical-align:top;\">\n                    <p style=\"margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);\">Email</p>\n                    <p style=\"margin:0;font-size:15px;color:#432dd7;font-weight:500;\">\n                      <a href=\"mailto:").concat(values.email, "\" style=\"color:#432dd7;text-decoration:none;\">").concat(values.email, "</a>\n                    </p>\n                  </td>\n                </tr>\n              </table>\n\n              <!-- Company & Project Type -->\n              ").concat(values.company || values.projectType ? "\n              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-bottom:24px;\">\n                <tr>\n                  ".concat(values.company ? "\n                  <td width=\"50%\" style=\"padding-right:12px;vertical-align:top;\">\n                    <p style=\"margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);\">Company</p>\n                    <p style=\"margin:0;font-size:15px;color:#0d1727;\">".concat(values.company, "</p>\n                  </td>") : "<td></td>", "\n                  ").concat(values.projectType ? "\n                  <td width=\"50%\" style=\"padding-left:12px;vertical-align:top;\">\n                    <p style=\"margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);\">Project type</p>\n                    <p style=\"margin:0;font-size:15px;color:#0d1727;\">".concat(values.projectType, "</p>\n                  </td>") : "<td></td>", "\n                </tr>\n              </table>") : "", "\n\n              <!-- Divider -->\n              <hr style=\"border:none;border-top:1px solid rgba(15,23,42,0.08);margin:0 0 24px;\" />\n\n              <!-- Brief -->\n              <p style=\"margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);\">Project brief</p>\n              <div style=\"background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);\">\n                <p style=\"margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);\">").concat(values.brief.replace(/\n/g, "<br/>"), "</p>\n              </div>\n\n            </td>\n          </tr>\n\n          <!-- Footer -->\n          <tr>\n            <td style=\"padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);\">\n              <p style=\"margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);\">Submitted ").concat(values.submittedAt, " \u00B7 sonicverse.eu</p>\n              <div style=\"display:flex;gap:16px;\">\n                <a href=\"https://github.com/sonicverse-eu\" style=\"color:#432dd7;font-size:12px;text-decoration:none;\">GitHub</a>\n              </div>\n            </td>\n          </tr>\n\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>");
}
function buildConfirmationEmailHtml(values) {
    return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>We received your message</title>\n</head>\n<body style=\"margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;\">\n  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:40px 16px;\">\n    <tr>\n      <td align=\"center\">\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;\">\n\n          <!-- Header -->\n          <tr>\n            <td style=\"background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;\">\n              <p style=\"margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);\">Sonicverse</p>\n              <h1 style=\"margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;\">We received your message</h1>\n            </td>\n          </tr>\n\n          <!-- Body -->\n          <tr>\n            <td style=\"padding:36px 40px;\">\n              <p style=\"margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);\">Hi ".concat(values.name, ",</p>\n              <p style=\"margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);\">Thanks for reaching out. Your note reached us successfully and we\u2019ll review it carefully before replying.</p>\n              <p style=\"margin:0 0 24px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);\">Submitted ").concat(values.submittedAt, " \u00B7 sonicverse.eu</p>\n\n              <!-- Call to Action -->\n              <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-bottom:24px;\">\n                <tr>\n                  <td align=\"center\">\n                    <a href=\"https://sonicverse.eu\" style=\"display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#4d35ef,#432dd7);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;\">Visit Our Website</a>\n                  </td>\n                </tr>\n              </table>\n\n              <!-- Additional Info -->\n              <p style=\"margin:0 0 8px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);\">In the meantime, you can:</p>\n              <ul style=\"margin:0 0 16px;padding-left:20px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);\">\n                <li>Explore our portfolio and services</li>\n                <li>Follow us on social media for updates</li>\n                <li>Check out our blog for insights</li>\n              </ul>\n\n              <!-- Contact Info -->\n              <p style=\"margin:0 0 4px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);\">Need immediate assistance?</p>\n              <p style=\"margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);\">Reply to this email or contact us at <a href=\"mailto:hello@sonicverse.eu\" style=\"color:#432dd7;text-decoration:none;\">hello@sonicverse.eu</a></p>\n            </td>\n          </tr>\n\n          <!-- Footer -->\n          <tr>\n            <td style=\"padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);\">\n              <p style=\"margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);\">Submitted ").concat(values.submittedAt, " \u00B7 sonicverse.eu</p>\n              <div style=\"display:flex;gap:16px;\">\n                <a href=\"https://github.com/sonicverse-eu\" style=\"color:#432dd7;font-size:12px;text-decoration:none;\">GitHub</a>\n              </div>\n            </td>\n          </tr>\n\n        </table>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>");
}
function submitContactForm(_previousState, formData) {
    return __awaiter(this, void 0, void 0, function () {
        var values, source, errors, senderAddress, recipientAddress, resendApiKey, submittedAt, subject, confirmationSubject, response, confirmationResponse, e_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    values = {
                        name: getString(formData, "name"),
                        email: getString(formData, "email"),
                        company: getString(formData, "company"),
                        projectType: getString(formData, "projectType"),
                        brief: getString(formData, "brief"),
                    };
                    source = getString(formData, "source") || "/contact";
                    errors = {};
                    if (!values.name)
                        errors.name = "Please share your name.";
                    if (!values.email) {
                        errors.email = "Please share an email address.";
                    }
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                        errors.email = "Please enter a valid email address.";
                    }
                    if (!values.brief) {
                        errors.brief = "Please include a short project brief.";
                    }
                    else if (values.brief.length < 30) {
                        errors.brief = "A little more context will help us respond usefully.";
                    }
                    if (Object.keys(errors).length > 0) {
                        return [2 /*return*/, { status: "error", message: "Please review the highlighted fields.", errors: errors, values: values }];
                    }
                    senderAddress = (_a = process.env.EMAIL_SENDER) !== null && _a !== void 0 ? _a : "Sonicverse <hello@sonicverse.eu>";
                    recipientAddress = (_b = process.env.EMAIL_RECIPIENT) !== null && _b !== void 0 ? _b : "hello@sonicverse.eu";
                    resendApiKey = process.env.RESEND_API_KEY;
                    submittedAt = new Date().toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    });
                    if (!resendApiKey) {
                        return [2 /*return*/, {
                                status: "error",
                                message: "Contact delivery is not configured. Set RESEND_API_KEY in your deployment environment.",
                                errors: {},
                                values: values,
                            }];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    subject = "New inquiry from ".concat(values.name).concat(values.company ? " \u00B7 ".concat(values.company) : "");
                    confirmationSubject = "We received your message";
                    return [4 /*yield*/, fetch("https://api.resend.com/emails", {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(resendApiKey),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                from: senderAddress,
                                to: [recipientAddress],
                                subject: subject,
                                text: "".concat(values.name, " <").concat(values.email, ">\n\n").concat(values.brief),
                                html: buildEmailHtml(__assign(__assign({}, values), { submittedAt: submittedAt })),
                                reply_to: values.email,
                            }),
                        })];
                case 2:
                    response = _c.sent();
                    if (!response.ok) {
                        throw new Error("Resend API error: ".concat(response.status));
                    }
                    return [4 /*yield*/, fetch("https://api.resend.com/emails", {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(resendApiKey),
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                from: senderAddress,
                                to: [values.email],
                                subject: confirmationSubject,
                                text: "Hi ".concat(values.name, ",\n\nThanks for reaching out. Your note reached us successfully and we\u2019ll review it carefully before replying.\n\nSubmitted ").concat(submittedAt, " \u00B7 sonicverse.eu"),
                                html: buildConfirmationEmailHtml({ name: values.name, submittedAt: submittedAt }),
                            }),
                        })];
                case 3:
                    confirmationResponse = _c.sent();
                    if (!confirmationResponse.ok) {
                        throw new Error("Resend API error: ".concat(confirmationResponse.status));
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _c.sent();
                    return [2 /*return*/, {
                            status: "error",
                            message: "The message could not be delivered right now. Please try again or email us directly.",
                            errors: {},
                            values: values,
                        }];
                case 5: return [2 /*return*/, {
                        status: "success",
                        message: "Thanks. We sent a confirmation email and will reply with a thoughtful next step.",
                        errors: {},
                        values: contact_form_1.initialContactFormState.values,
                    }];
            }
        });
    });
}
