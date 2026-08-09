import { useState } from 'react'
import { motion } from 'motion/react'
import * as Accordion from '@radix-ui/react-accordion'
import { Minus, Plus } from 'lucide-react'

export default function FaqChatAccordion({
  data,
  timestamp = '',
  className = '',
  questionClassName = '',
  answerClassName = '',
}) {
  const [openItem, setOpenItem] = useState(null)

  return (
    <div className={'faq-chat ' + className}>
      {timestamp && <p className="faq-chat-timestamp">{timestamp}</p>}
      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ''}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item
            value={item.id.toString()}
            key={item.id}
            className="faq-chat-item"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="faq-chat-trigger"
                id={`faq-trigger-${item.id}`}
                aria-controls={`faq-panel-${item.id}`}
              >
                <span className="faq-chat-question">
                  {item.icon && (
                    <span
                      className={
                        'faq-chat-icon faq-chat-icon-' +
                        (item.iconPosition === 'right' ? 'right' : 'left')
                      }
                      aria-hidden="true"
                    >
                      <item.icon size={14} strokeWidth={1.5} />
                    </span>
                  )}
                  <span className={'faq-chat-question-text' + (questionClassName ? ' ' + questionClassName : '')}>{item.question}</span>
                </span>
                <span
                  className={
                    'faq-chat-toggle' +
                    (openItem === item.id.toString() ? ' is-open' : '')
                  }
                  aria-hidden="true"
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="faq-chat-toggle-icon" />
                  ) : (
                    <Plus className="faq-chat-toggle-icon" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                initial="collapsed"
                animate={openItem === item.id.toString() ? 'open' : 'collapsed'}
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="faq-chat-content"
              >
                <div className="faq-chat-bubble-row">
                  <motion.div
                    className={'faq-chat-bubble' + (answerClassName ? ' ' + answerClassName : '')}
                    variants={{
                      open: { opacity: 1, scale: 1 },
                      collapsed: { opacity: 0, scale: 0.96 },
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {item.answer}
                  </motion.div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}