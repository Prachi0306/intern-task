import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What tech stack is TaskFlow built with?',
    answer: 'TaskFlow uses the MERN stack — MongoDB for the database, Express.js for the backend API, React.js (Vite) for the frontend, and Node.js as the runtime. Styling is done with Tailwind CSS, animations with Framer Motion.',
  },
  {
    question: 'Is TaskFlow free to use?',
    answer: 'Yes! TaskFlow is completely free and open source. You can deploy it yourself using MongoDB Atlas (free tier), Render (free tier), and Vercel (free tier).',
  },
  {
    question: 'Can I use this for my portfolio?',
    answer: 'Absolutely! TaskFlow is designed to be a professional-grade portfolio project. It demonstrates full-stack development skills including REST APIs, state management, responsive design, and modern UI/UX patterns.',
  },
  {
    question: 'Does it support mobile devices?',
    answer: 'Yes, TaskFlow is fully responsive and works perfectly on desktop, tablet, and mobile. The sidebar collapses into a drawer on smaller screens, and all components adapt to different viewports.',
  },
  {
    question: 'How is the data stored?',
    answer: 'Task data is stored in MongoDB Atlas, a cloud-hosted database. The backend provides a RESTful API with full CRUD operations, filtering, sorting, pagination, and validation.',
  },
  {
    question: 'Can I customize the categories and priorities?',
    answer: 'The current version supports predefined categories (Work, Personal, Study, Health, Finance, Other) and priorities (Low, Medium, High). The architecture makes it straightforward to extend these in the codebase.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <motion.div
      className={`border border-dark-500/30 rounded-xl overflow-hidden transition-colors duration-200 ${
        isOpen ? 'bg-dark-700/30 border-accent-500/20' : 'bg-dark-800/30 hover:border-dark-400/40'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`text-sm font-medium pr-4 ${isOpen ? 'text-white' : 'text-gray-300'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className={isOpen ? 'text-accent-400' : 'text-gray-500'} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5">
              <p className="text-gray-400 text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
