import { useState, useRef, useEffect } from 'react';

export default function CategorySelector({ categories, value, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Get selected category object
  const selectedCategory = categories.find((c) => c.id === value);

  // Filter categories based on input
  const filteredCategories = inputValue.trim()
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : categories;

  // Reset highlighted index when filtered results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredCategories.length]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const highlightedEl = listRef.current.children[highlightedIndex];
      if (highlightedEl) {
        highlightedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (category) => {
    onChange(category.id);
    setInputValue('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCategories.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCategories[highlightedIndex]) {
          handleSelect(filteredCategories[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setInputValue('');
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = (e) => {
    // Delay to allow click on dropdown items
    setTimeout(() => {
      setIsOpen(false);
      setInputValue('');
    }, 150);
  };

  return (
    <div className="category-selector">
      {selectedCategory ? (
        <div className="category-selected">
          <span className="category-selected-name">{selectedCategory.name}</span>
          <button
            type="button"
            className="category-clear-btn"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="category-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Type to search categories..."
            className="category-input"
            autoComplete="off"
          />
          <svg
            className="category-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      )}

      {isOpen && !selectedCategory && (
        <div className="category-dropdown" ref={listRef}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                className={`category-option ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                onClick={() => handleSelect(category)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className="category-option-name">{category.name}</span>
                {category.slug && (
                  <span className="category-option-slug">/{category.slug}</span>
                )}
              </button>
            ))
          ) : (
            <div className="category-no-results">
              <span>No categories found</span>
              {inputValue && (
                <span className="category-hint">
                  Create "{inputValue}" in Categories page
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
