/**
 * Variation Selector - Haus of Crunch Theme
 * Handles button-based variation selection and syncs with WooCommerce hidden selects
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        // Initialize variation selector buttons
        $('.hoc-variation-selector').each(function() {
            var $selector = $(this);
            // Find the select - it might have our class or be the standard WooCommerce select
            var $hiddenSelect = $selector.find('select');
            if (!$hiddenSelect.length) {
                // Fallback: try to find by attribute name
                var attributeName = $selector.data('attribute');
                if (attributeName) {
                    $hiddenSelect = $selector.closest('.variations').find('select[name="attribute_' + attributeName + '"]');
                }
            }
            var $buttons = $selector.find('.hoc-variation-selector__button');
            
            // Debounce timeout for this selector
            var syncTimeout = null;

            // Function to sync button states with select options
            var syncButtonStates = function(immediate) {
                // Only proceed if we have the necessary elements
                if (!$hiddenSelect.length || !$buttons.length) {
                    return;
                }
                
                // If immediate, execute right away; otherwise debounce
                if (immediate) {
                    // Clear any pending sync
                    if (syncTimeout !== null) {
                        clearTimeout(syncTimeout);
                        syncTimeout = null;
                    }
                    executeSync();
                } else {
                    // Debounce: clear any pending sync and set new one
                    if (syncTimeout !== null) {
                        clearTimeout(syncTimeout);
                    }
                    syncTimeout = setTimeout(executeSync, 50);
                }
                
                function executeSync() {
                    syncTimeout = null;
                
                // Update all buttons based on their corresponding select options
                $buttons.each(function() {
                    var $button = $(this);
                    var buttonValue = $button.data('value');
                    
                    // Skip if no value
                    if (!buttonValue) {
                        return;
                    }
                    
                    var $option = $hiddenSelect.find('option[value="' + buttonValue + '"]');
                    
                    // Check if option exists and is available
                    var optionExists = $option.length > 0;
                    var isDisabled = optionExists ? $option.prop('disabled') : true;
                    var isPlaceholder = optionExists && ($option.val() === '' || $option.index() === 0);
                    
                    // An option is available if:
                    // 1. It exists in the select
                    // 2. It's not disabled
                    // 3. It's not the placeholder option
                    var isAvailable = optionExists && !isDisabled && !isPlaceholder;
                    
                    if (!isAvailable) {
                        // Option not available - disable button
                        var wasSelected = $button.hasClass('hoc-variation-selector__button--selected');
                        
                        $button.prop('disabled', true)
                               .attr('aria-disabled', 'true')
                               .addClass('hoc-variation-selector__button--disabled');
                        
                        // If it was selected but is now unavailable, clear selection
                        if (wasSelected) {
                            $button.removeClass('hoc-variation-selector__button--selected')
                                   .attr('aria-pressed', 'false');
                            // Clear the select value if this was the selected option
                            if ($hiddenSelect.length && $hiddenSelect.val() === buttonValue) {
                                $hiddenSelect.val('');
                            }
                        }
                    } else {
                        // Option available - enable button
                        $button.prop('disabled', false)
                               .attr('aria-disabled', 'false')
                               .removeClass('hoc-variation-selector__button--disabled');
                    }
                });
                }
            };

            // Handle button clicks
            $buttons.on('click', function(e) {
                e.preventDefault();
                
                var $button = $(this);
                
                // Prevent clicking disabled buttons
                if ($button.prop('disabled') || $button.hasClass('hoc-variation-selector__button--disabled')) {
                    return;
                }
                
                var value = $button.data('value');
                var attributeName = $button.data('attribute');
                var isCurrentlySelected = $button.hasClass('hoc-variation-selector__button--selected');

                // Ensure we have a select element
                if (!$hiddenSelect.length) {
                    if (window.console && console.warn) {
                        console.warn('HOC Variation Selector: Could not find select element');
                    }
                    return;
                }

                // If button is already selected, unselect it (toggle off)
                if (isCurrentlySelected) {
                    // Clear the selection
                    $button.removeClass('hoc-variation-selector__button--selected')
                            .attr('aria-pressed', 'false');
                    
                    // Clear the select value (set to empty string or first placeholder option)
                    var $firstOption = $hiddenSelect.find('option').first();
                    var emptyValue = $firstOption.length ? $firstOption.val() : '';
                    $hiddenSelect.val(emptyValue);

                    // Trigger WooCommerce variation change events to reset
                    var $form = $selector.closest('.variations_form');
                    if ($form.length && $hiddenSelect.length) {
                        var selectElement = $hiddenSelect[0];
                        
                        if (selectElement) {
                            selectElement.value = emptyValue;
                            // Trigger the change event with WooCommerce's specific namespace
                            $hiddenSelect.trigger('change.wc-variation-form');
                        }
                    }
                    
                    return; // Exit early since we've handled the unselect
                }

                // Verify the value exists and is available in the select
                var $option = $hiddenSelect.find('option[value="' + value + '"]');
                if (!$option.length || $option.prop('disabled')) {
                    if (window.console && console.warn) {
                        console.warn('HOC Variation Selector: Value "' + value + '" is not available');
                    }
                    return;
                }

                // Update hidden select value first
                $hiddenSelect.val(value);

                // Update button states
                $buttons.removeClass('hoc-variation-selector__button--selected')
                        .attr('aria-pressed', 'false');
                
                $button.addClass('hoc-variation-selector__button--selected')
                        .attr('aria-pressed', 'true');

                // Trigger WooCommerce variation change events
                // WooCommerce listens for 'change.wc-variation-form' on .variations select
                var $form = $selector.closest('.variations_form');
                if ($form.length && $hiddenSelect.length) {
                    var selectElement = $hiddenSelect[0];
                    
                    // Set value using jQuery first (ensures any jQuery handlers see it)
                    $hiddenSelect.val(value);
                    
                    // Then set using native DOM to ensure it's in the DOM
                    if (selectElement) {
                        selectElement.value = value;
                        
                        // Trigger the change event with WooCommerce's specific namespace
                        // This is the exact event WooCommerce's VariationForm listens for
                        $hiddenSelect.trigger('change.wc-variation-form');
                    }
                }
            });

            // Sync button states when select value changes (e.g., from WooCommerce JS)
            $hiddenSelect.on('change', function() {
                var selectedValue = $(this).val();
                
                $buttons.removeClass('hoc-variation-selector__button--selected')
                        .attr('aria-pressed', 'false');
                
                if (selectedValue) {
                    $buttons.filter('[data-value="' + selectedValue + '"]')
                            .addClass('hoc-variation-selector__button--selected')
                            .attr('aria-pressed', 'true');
                }
            });

            // Disable unavailable options when WooCommerce updates variation values
            // Listen for WooCommerce's update_variation_values event
            var $form = $selector.closest('.variations_form');
            if ($form.length) {
                // Track if initial sync has been done
                var initialSyncDone = false;
                
                // Sync button states when WooCommerce updates variation values (immediate)
                // This handles both initial load and subsequent updates
                $form.on('woocommerce_update_variation_values', function() {
                    syncButtonStates(true);
                    // Mark initial sync as done on first event
                    if (!initialSyncDone) {
                        initialSyncDone = true;
                    }
                });
                
                // Also sync when variation changes (debounced to let WooCommerce update)
                $form.on('woocommerce_variation_has_changed check_variations', function() {
                    syncButtonStates(false);
                });
                
                // Sync when any attribute changes (for other attributes, debounced)
                $form.on('change', '.variations select', function() {
                    syncButtonStates(false);
                });

                // Fallback: if update event doesn't fire, sync after delay
                // This ensures buttons are synced even if WooCommerce event doesn't fire
                setTimeout(function() {
                    if (!initialSyncDone) {
                        initialSyncDone = true;
                        syncButtonStates(true);
                    }
                }, 500);

                // Initialize button states based on current select value
                var initialValue = $hiddenSelect.val();
                if (initialValue) {
                    $buttons.filter('[data-value="' + initialValue + '"]')
                            .addClass('hoc-variation-selector__button--selected')
                            .attr('aria-pressed', 'true');
                }
            }
        });

        // Handle keyboard navigation for accessibility (only navigate enabled buttons)
        $('.hoc-variation-selector__button').on('keydown', function(e) {
            var $button = $(this);
            var $buttons = $button.closest('.hoc-variation-selector__grid')
                                   .find('.hoc-variation-selector__button:not(:disabled):not(.hoc-variation-selector__button--disabled)');
            var currentIndex = $buttons.index($button);
            var $target = null;

            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    $target = $buttons.eq(currentIndex + 1);
                    if (!$target.length && currentIndex < $buttons.length - 1) {
                        // Wrap to next row
                        $target = $buttons.eq(currentIndex + 2);
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    $target = $buttons.eq(currentIndex - 1);
                    if (!$target.length && currentIndex > 0) {
                        // Wrap to previous row
                        $target = $buttons.eq(currentIndex - 2);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    // Move down (usually +2 in a 2-column grid)
                    $target = $buttons.eq(currentIndex + 2);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    // Move up (usually -2 in a 2-column grid)
                    $target = $buttons.eq(currentIndex - 2);
                    break;
                case 'Home':
                    e.preventDefault();
                    $target = $buttons.first();
                    break;
                case 'End':
                    e.preventDefault();
                    $target = $buttons.last();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    $button.trigger('click');
                    return;
            }

            if ($target && $target.length) {
                $target.focus();
            }
        });
    });

    // Re-initialize when variations are reloaded (e.g., via AJAX)
    $(document.body).on('wc_variation_form', function() {
        // Re-initialize button states
        $('.hoc-variation-selector').each(function() {
            var $selector = $(this);
            var $hiddenSelect = $selector.find('.hoc-variation-selector__hidden-select');
            var $buttons = $selector.find('.hoc-variation-selector__button');
            var currentValue = $hiddenSelect.val();

            $buttons.removeClass('hoc-variation-selector__button--selected')
                    .attr('aria-pressed', 'false');

            if (currentValue) {
                $buttons.filter('[data-value="' + currentValue + '"]')
                        .addClass('hoc-variation-selector__button--selected')
                        .attr('aria-pressed', 'true');
            }
        });
    });

    /**
     * Update main product price when variation changes
     * This replaces the separate variation price display with updating the main price
     */
    $(document).ready(function() {
        var $variationForm = $('.variations_form');
        
        if ($variationForm.length) {
            // Store the original price on page load
            var $mainPrice = $('.summary .price, .entry-summary .price, .product .price').first();
            var originalPriceHtml = $mainPrice.length ? $mainPrice.html() : null;
            
            // Listen for when a variation is found/selected
            $variationForm.on('found_variation', function(event, variation) {
                // Get the variation price HTML
                var variationPriceHtml = variation.price_html;
                
                if (variationPriceHtml && $mainPrice.length) {
                    // Update the main price with the variation price
                    $mainPrice.html(variationPriceHtml);
                }
            });
            
            // Listen for when variations are reset/cleared
            $variationForm.on('reset_data', function() {
                // Restore the original price
                if (originalPriceHtml && $mainPrice.length) {
                    $mainPrice.html(originalPriceHtml);
                }
            });
            
            // Also listen for the show_variation event (alternative event)
            $variationForm.on('show_variation', function(event, variation) {
                var variationPriceHtml = variation.price_html;
                
                if (variationPriceHtml && $mainPrice.length) {
                    $mainPrice.html(variationPriceHtml);
                }
            });
            
            // Listen for hide_variation event (when no valid variation is selected)
            $variationForm.on('hide_variation', function() {
                // Restore original price when variation is hidden
                if (originalPriceHtml && $mainPrice.length) {
                    $mainPrice.html(originalPriceHtml);
                }
            });
        }
    });

})(jQuery);

