# frozen_string_literal: true

if defined?(Jekyll::Emoji)
  module JemojiFastSkip
    SHORTCODE_SENTINEL = /:[A-Za-z0-9_+\-]+:/.freeze

    def emojify(doc)
      return unless doc.output&.match?(SHORTCODE_SENTINEL)

      super
    end
  end

  Jekyll::Emoji.singleton_class.prepend(JemojiFastSkip)
end
