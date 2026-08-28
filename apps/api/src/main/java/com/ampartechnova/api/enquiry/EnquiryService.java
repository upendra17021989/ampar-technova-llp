package com.ampartechnova.api.enquiry;

import java.time.Clock;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.UUID;

import com.ampartechnova.api.product.ProductRepository;
import com.ampartechnova.api.shared.InvalidRequestException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnquiryService {

    private static final DateTimeFormatter REFERENCE_DATE = DateTimeFormatter.BASIC_ISO_DATE;
    private final EnquiryRepository enquiryRepository;
    private final ProductRepository productRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final Clock clock;

    public EnquiryService(EnquiryRepository enquiryRepository, ProductRepository productRepository,
            ApplicationEventPublisher eventPublisher) {
        this.enquiryRepository = enquiryRepository;
        this.productRepository = productRepository;
        this.eventPublisher = eventPublisher;
        this.clock = Clock.systemUTC();
    }

    @Transactional
    public EnquiryResponse submit(EnquiryRequest request) {
        validateProduct(request.productSlug());
        UUID id = UUID.randomUUID();
        String reference = "AMP-" + LocalDate.now(clock).format(REFERENCE_DATE) + "-"
                + id.toString().substring(0, 8).toUpperCase(Locale.ROOT);
        Enquiry enquiry = new Enquiry(id, reference, request, clock.instant());
        Enquiry saved = enquiryRepository.save(enquiry);
        eventPublisher.publishEvent(EnquirySubmittedEvent.from(saved));
        return EnquiryResponse.from(saved);
    }

    private void validateProduct(String productSlug) {
        if (productSlug != null && !productSlug.isBlank()
                && !productRepository.existsBySlugAndPublicationStatus(productSlug, "PUBLISHED")) {
            throw new InvalidRequestException("Selected product is not available");
        }
    }
}
