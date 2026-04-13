module.exports=[37936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"registerServerReference",{enumerable:!0,get:function(){return d.registerServerReference}});let d=a.r(11857)},13095,(a,b,c)=>{"use strict";function d(a){for(let b=0;b<a.length;b++){let c=a[b];if("function"!=typeof c)throw Object.defineProperty(Error(`A "use server" file can only export async functions, found ${typeof c}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),"__NEXT_ERROR_CODE",{value:"E352",enumerable:!1,configurable:!0})}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"ensureServerEntryExports",{enumerable:!0,get:function(){return d}})},27797,a=>{"use strict";var b=a.i(37936);let c={name:"",email:"",company:"",projectType:"",brief:""};function d(a,b){let c=a.get(b);return"string"==typeof c?c.trim():""}async function e(a,b){let e={name:d(b,"name"),email:d(b,"email"),company:d(b,"company"),projectType:d(b,"projectType"),brief:d(b,"brief")},f={};if(e.name||(f.name="Please share your name."),e.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)||(f.email="Please enter a valid email address."):f.email="Please share an email address.",e.brief?e.brief.length<30&&(f.brief="A little more context will help us respond usefully."):f.brief="Please include a short project brief.",Object.keys(f).length>0)return{status:"error",message:"Please review the highlighted fields.",errors:f,values:e};let g=process.env.EMAIL_SENDER??"noreply@mail.sonicverse.eu",h=process.env.EMAIL_RECIPIENT??"hello@sonicverse.eu",i=process.env.RESEND_API_KEY,j=new Date().toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"});if(!i)return{status:"error",message:"Contact delivery is not configured. Set RESEND_API_KEY in your deployment environment.",errors:{},values:e};try{var k,l;let a=`New inquiry from ${e.name}${e.company?` \xb7 ${e.company}`:""}`,b=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({from:g,to:[h],subject:a,text:`${e.name} <${e.email}>

${e.brief}`,html:(k={...e,submittedAt:j},`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Sonicverse</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;">New Contact Inquiry</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Name & Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Name</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;font-weight:500;">${k.name}</p>
                  </td>
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Email</p>
                    <p style="margin:0;font-size:15px;color:#432dd7;font-weight:500;">
                      <a href="mailto:${k.email}" style="color:#432dd7;text-decoration:none;">${k.email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Company & Project Type -->
              ${k.company||k.projectType?`
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  ${k.company?`
                  <td width="50%" style="padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Company</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${k.company}</p>
                  </td>`:"<td></td>"}
                  ${k.projectType?`
                  <td width="50%" style="padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Project type</p>
                    <p style="margin:0;font-size:15px;color:#0d1727;">${k.projectType}</p>
                  </td>`:"<td></td>"}
                </tr>
              </table>`:""}

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid rgba(15,23,42,0.08);margin:0 0 24px;" />

              <!-- Brief -->
              <p style="margin:0 0 8px;font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(13,23,39,0.44);">Project brief</p>
              <div style="background:#f4f7fd;border-radius:16px;padding:20px 24px;border:1px solid rgba(15,23,42,0.06);">
                <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">${k.brief.replace(/\n/g,"<br/>")}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);">
              <p style="margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);">Submitted ${k.submittedAt} \xb7 sonicverse.eu</p>
              <div style="display:flex;gap:16px;">
                <a href="https://github.com/sonicverse-eu" style="color:#432dd7;font-size:12px;text-decoration:none;">GitHub</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`),reply_to:e.email})});if(!b.ok)throw Error(`Resend API error: ${b.status}`);let c=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({from:g,to:[e.email],subject:"We received your message",text:`Hi ${e.name},

Thanks for reaching out. Your note reached us successfully and we’ll review it carefully before replying.

Submitted ${j} \xb7 sonicverse.eu`,html:(l={name:e.name,submittedAt:j},`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your message</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fd;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;border:1px solid rgba(15,23,42,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4d35ef,#432dd7);padding:32px 40px;">
              <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.7);">Sonicverse</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.03em;">We received your message</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Hi ${l.name},</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Thanks for reaching out. Your note reached us successfully and we’ll review it carefully before replying.</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Submitted ${l.submittedAt} \xb7 sonicverse.eu</p>

              <!-- Call to Action -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="https://sonicverse.eu" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#4d35ef,#432dd7);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">Visit Our Website</a>
                  </td>
                </tr>
              </table>

              <!-- Additional Info -->
              <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">In the meantime, you can:</p>
              <ul style="margin:0 0 16px;padding-left:20px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">
                <li>Explore our portfolio and services</li>
                <li>Follow us on social media for updates</li>
                <li>Check out our blog for insights</li>
              </ul>

              <!-- Contact Info -->
              <p style="margin:0 0 4px;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.82);">Need immediate assistance?</p>
              <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(13,23,39,0.78);">Reply to this email or contact us at <a href="mailto:hello@sonicverse.eu" style="color:#432dd7;text-decoration:none;">hello@sonicverse.eu</a></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(15,23,42,0.06);">
              <p style="margin:0 0 16px;font-size:12px;color:rgba(13,23,39,0.38);">Submitted ${l.submittedAt} \xb7 sonicverse.eu</p>
              <div style="display:flex;gap:16px;">
                <a href="https://github.com/sonicverse-eu" style="color:#432dd7;font-size:12px;text-decoration:none;">GitHub</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`)})});if(!c.ok)throw Error(`Resend API error: ${c.status}`)}catch{return{status:"error",message:"The message could not be delivered right now. Please try again or email us directly.",errors:{},values:e}}return{status:"success",message:"Thanks. We sent a confirmation email and will reply with a thoughtful next step.",errors:{},values:c}}(0,a.i(13095).ensureServerEntryExports)([e]),(0,b.registerServerReference)(e,"6037f4bf12a7e1bf509f8d0a48b3171da7cdc2421a",null),a.s([],12581),a.i(12581),a.s(["6037f4bf12a7e1bf509f8d0a48b3171da7cdc2421a",0,e],27797)}];

//# sourceMappingURL=_0c1bk28._.js.map