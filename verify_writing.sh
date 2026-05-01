#!/bin/bash

# Verification script for _writing/ directory formatting

WRITING_DIR="/c/code_dinghao_other/dinghaoluo.github.io/_writing"
ISSUES_FOUND=0
CLEAN_FILES=0

declare -A ISSUE_CATEGORIES
ISSUE_CATEGORIES=(
    ["links_section"]=0
    ["feature_banner_mismatch"]=0
    ["source_note_brackets"]=0
    ["source_note_duplicate_date"]=0
    ["double_quotes_prose"]=0
    ["journal_pull_quotes"]=0
    ["outlet_meta_display"]=0
)

echo "=== COMPREHENSIVE VERIFICATION SWEEP ==="
echo "Checking all files in _writing/ directory..."
echo ""

for file in "$WRITING_DIR"/*.md; do
    filename=$(basename "$file")
    file_issues=()

    # Read file content
    content=$(cat "$file")

    # Extract frontmatter
    frontmatter=$(awk '/^---$/{if(++n==2){exit}}n==1' "$file")

    # Extract prose (after frontmatter)
    prose=$(awk '/^---$/{if(++n==2){flag=1;next}}flag' "$file")

    # Check 1: links: section in frontmatter
    if echo "$frontmatter" | grep -q "^links:"; then
        file_issues+=("❌ Has 'links:' section in frontmatter")
        ((ISSUE_CATEGORIES[links_section]++))
    fi

    # Check 2: feature_banner without writing_feature
    has_feature_banner=$(echo "$frontmatter" | grep -c "^feature_banner: true" || true)
    has_writing_feature=$(echo "$frontmatter" | grep -c "^writing_feature: true" || true)
    if [ "$has_feature_banner" -gt 0 ] && [ "$has_writing_feature" -eq 0 ]; then
        file_issues+=("❌ Has 'feature_banner: true' without 'writing_feature: true'")
        ((ISSUE_CATEGORIES[feature_banner_mismatch]++))
    fi

    # Check 3: Source note with Chinese publication - should use 「」 brackets
    if echo "$prose" | grep -E "Originally published in Chinese" | grep -v "「.*」" | grep -q .; then
        file_issues+=("❌ Chinese publication source note missing 「」 brackets")
        ((ISSUE_CATEGORIES[source_note_brackets]++))
    fi

    # Check 4: Source note with duplicate date
    # Extract date from frontmatter
    fm_date=$(echo "$frontmatter" | grep "^date:" | sed 's/date: //' | tr -d '\r')
    if [ -n "$fm_date" ]; then
        # Check if source note contains the same date
        if echo "$prose" | grep -E "Originally published" | grep -q "$fm_date"; then
            file_issues+=("❌ Source note contains duplicate date already in frontmatter")
            ((ISSUE_CATEGORIES[source_note_duplicate_date]++))
        fi
    fi

    # Check 5: Double quotes in prose (excluding HTML attributes, code blocks, frontmatter)
    # Remove code blocks first
    prose_no_code=$(echo "$prose" | sed '/```/,/```/d')
    # Remove HTML tags
    prose_no_html=$(echo "$prose_no_code" | sed 's/<[^>]*>//g')
    # Check for double quotes
    if echo "$prose_no_html" | grep -E '[^<>=]"[^"]*"[^>]' | grep -v "^#" | grep -q .; then
        file_issues+=("❌ Contains double quotes in prose (should be single quotes)")
        ((ISSUE_CATEGORIES[double_quotes_prose]++))
    fi

    # Check 6: Journal entries with pull quotes
    category=$(echo "$frontmatter" | grep "^category:" | sed 's/category: //' | tr -d '\r')
    if [ "$category" = "journal" ]; then
        if echo "$prose" | grep -A1 "^>" | grep -q "{: .pullquote}"; then
            file_issues+=("❌ Journal entry contains pull quotes (should have zero)")
            ((ISSUE_CATEGORIES[journal_pull_quotes]++))
        fi
    fi

    # Check 7: outlet: without show_meta_outlet: false
    has_outlet=$(echo "$frontmatter" | grep -c "^outlet:" || true)
    has_show_meta=$(echo "$frontmatter" | grep -c "^show_meta_outlet: false" || true)
    if [ "$has_outlet" -gt 0 ] && [ "$has_show_meta" -eq 0 ]; then
        file_issues+=("❌ Has 'outlet:' but missing 'show_meta_outlet: false'")
        ((ISSUE_CATEGORIES[outlet_meta_display]++))
    fi

    # Report results for this file
    if [ ${#file_issues[@]} -eq 0 ]; then
        ((CLEAN_FILES++))
    else
        echo "📄 $filename"
        for issue in "${file_issues[@]}"; do
            echo "   $issue"
            ((ISSUES_FOUND++))
        done
        echo ""
    fi
done

echo "=== SUMMARY ==="
echo "Clean files: $CLEAN_FILES"
echo "Files with issues: $((34 - CLEAN_FILES))"
echo ""
echo "Total issues found: $ISSUES_FOUND"
echo ""
echo "Issues by category:"
echo "  - links: section: ${ISSUE_CATEGORIES[links_section]}"
echo "  - feature_banner mismatch: ${ISSUE_CATEGORIES[feature_banner_mismatch]}"
echo "  - Source note brackets: ${ISSUE_CATEGORIES[source_note_brackets]}"
echo "  - Source note duplicate date: ${ISSUE_CATEGORIES[source_note_duplicate_date]}"
echo "  - Double quotes in prose: ${ISSUE_CATEGORIES[double_quotes_prose]}"
echo "  - Journal pull quotes: ${ISSUE_CATEGORIES[journal_pull_quotes]}"
echo "  - outlet meta display: ${ISSUE_CATEGORIES[outlet_meta_display]}"
