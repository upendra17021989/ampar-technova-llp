package com.ampartechnova.api.enquiry;

import java.time.Clock;
import java.util.UUID;

import com.ampartechnova.api.shared.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminEnquiryService {
    private final EnquiryRepository repository;
    private final Clock clock = Clock.systemUTC();

    public AdminEnquiryService(EnquiryRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Page<AdminEnquiryResponse> list(EnquiryStatus status, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Enquiry> enquiries = status == null ? repository.findAll(pageable) : repository.findAllByStatus(status, pageable);
        return enquiries.map(AdminEnquiryResponse::from);
    }

    @Transactional(readOnly = true)
    public AdminEnquiryResponse get(UUID id) {
        return AdminEnquiryResponse.from(find(id));
    }

    @Transactional
    public AdminEnquiryResponse updateStatus(UUID id, EnquiryStatusRequest request) {
        Enquiry enquiry = find(id);
        enquiry.updateStatus(request.status(), clock.instant());
        return AdminEnquiryResponse.from(enquiry);
    }

    private Enquiry find(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found"));
    }
}
