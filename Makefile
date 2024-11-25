# Directories
SRC_DIR := ./
DEST_DIR := ./output

# Files to copy (space-separated list)
FILES := index.html style.css renderMarkdownFile.js

# Directories to copy (space-separated list)
DIRS := assets blog

# Rule to create the destination directory if it doesn't exist
$(DEST_DIR):
	mkdir -p $(DEST_DIR)

# Rule to copy individual files
copy-files: $(DEST_DIR)
	@for file in $(FILES); do \
		echo "Copying $$file to $(DEST_DIR)"; \
		cp $(SRC_DIR)/$$file $(DEST_DIR); \
	done

# Rule to copy directories
copy-dirs: $(DEST_DIR)
	@for dir in $(DIRS); do \
		echo "Copying $$dir to $(DEST_DIR)"; \
		cp -r $(SRC_DIR)/$$dir $(DEST_DIR); \
	done

# Rule to copy both files and directories
distribution: copy-files copy-dirs
	@echo "All files and directories copied."

# Clean rule (optional, removes destination content)
clean:
	rm -rf $(DEST_DIR)
	@echo "Destination directory cleaned."
