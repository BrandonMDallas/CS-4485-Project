package com.cs4485.group2.widgetapp.repository;

import com.cs4485.group2.widgetapp.model.Widget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WidgetRepository extends JpaRepository<Widget, Long> {
    Optional<Widget> findByUserId(Long userId);
}
