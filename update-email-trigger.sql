-- RUN THIS IN SUPABASE SQL EDITOR TO UPDATE YOUR EMAIL TRIGGER
-- This customizes the subject line to include the customer's phone and file count.

CREATE OR REPLACE FUNCTION public.send_upload_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer re_JDSLZqQq_JsToTWs88wbR66FNFoR79CCc', -- Using your Resend API Key
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'onboarding@resend.dev',
      'to', 'parasgph@gmail.com',
      'subject', format('Print Order: +91%s | %s Files', NEW.phone, jsonb_array_length(NEW.file_names)),
      'html', format(
        '<h3>New Print Upload Request</h3>
         <p>A new order has been placed on PrintPerfect.</p>
         <p><strong>Customer WhatsApp:</strong> <a href="https://wa.me/91%s">+91 %s</a></p>
         <p><strong>Total Files:</strong> %s</p>
         <p><strong>File List:</strong></p>
         <ul>%s</ul>
         <br/>
         <p><em>View these files in your Supabase "client-uploads" bucket.</em></p>',
        NEW.phone, 
        NEW.phone,
        jsonb_array_length(NEW.file_names),
        (SELECT string_agg('<li>' || name || '</li>', '') FROM (SELECT jsonb_array_elements_text(NEW.file_names) AS name) AS names)
      )
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
