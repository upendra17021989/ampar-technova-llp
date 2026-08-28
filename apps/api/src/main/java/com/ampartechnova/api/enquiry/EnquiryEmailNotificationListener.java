package com.ampartechnova.api.enquiry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@ConditionalOnProperty(name = "app.enquiry-mail.enabled", havingValue = "true")
public class EnquiryEmailNotificationListener {

    private static final Logger log = LoggerFactory.getLogger(EnquiryEmailNotificationListener.class);
    private final JavaMailSender mailSender;
    private final String recipient;
    private final String from;

    public EnquiryEmailNotificationListener(
            JavaMailSender mailSender,
            @Value("${app.enquiry-mail.recipient}") String recipient,
            @Value("${app.enquiry-mail.from}") String from) {
        this.mailSender = mailSender;
        this.recipient = recipient;
        this.from = from;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendSubmission(EnquirySubmittedEvent event) {
        try {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setFrom(from);
            email.setTo(recipient);
            email.setReplyTo(event.email());
            email.setSubject("New website quote request — " + event.referenceNumber());
            email.setText(formatBody(event));
            mailSender.send(email);
        } catch (RuntimeException exception) {
            log.error("Could not email enquiry {} to {}", event.referenceNumber(), recipient, exception);
        }
    }

    private String formatBody(EnquirySubmittedEvent event) {
        return """
                A new enquiry was submitted through the AMPAR Technova website.

                Reference: %s
                Type: %s
                Submitted: %s

                Contact
                Name: %s
                Company: %s
                Email: %s
                Phone: %s
                Country: %s

                Requirement
                Product: %s
                Industry: %s

                %s
                """.formatted(
                event.referenceNumber(), event.enquiryType(), event.submittedAt(),
                event.name(), event.company(), event.email(), event.phone(), valueOrNotSpecified(event.country()),
                valueOrNotSpecified(event.productSlug()), valueOrNotSpecified(event.industry()), event.message());
    }

    private String valueOrNotSpecified(String value) {
        return value == null || value.isBlank() ? "Not specified" : value;
    }
}
