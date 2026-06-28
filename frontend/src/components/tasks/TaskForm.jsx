import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { STATUSES, PRIORITIES, CATEGORIES } from '../../utils/constants';
import Button from '../ui/Button';

/**
 * TaskForm — Create/Edit form using React Hook Form.
 */
export default function TaskForm({ task, onSubmit, onCancel, loading }) {
  const isEdit = !!task;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'Medium',
      status: task?.status || 'Pending',
      category: task?.category || 'Other',
      dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      estimatedTime: task?.estimatedTime || '',
      tags: task?.tags?.join(', ') || '',
    },
  });

  const onFormSubmit = (data) => {
    const payload = {
      ...data,
      estimatedTime: data.estimatedTime ? parseInt(data.estimatedTime, 10) : null,
      dueDate: data.dueDate || null,
      tags: data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };
    onSubmit(payload);
  };

  const inputClass = 'input-field text-sm';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';
  const errorClass = 'mt-1 text-xs text-danger-500';

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'At least 3 characters' },
            maxLength: { value: 100, message: 'Max 100 characters' },
          })}
          className={`${inputClass} ${errors.title ? 'border-danger-500' : ''}`}
          placeholder="Enter task title"
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          {...register('description', {
            maxLength: { value: 1000, message: 'Max 1000 characters' },
          })}
          rows={3}
          className={`${inputClass} resize-none ${errors.description ? 'border-danger-500' : ''}`}
          placeholder="Describe the task..."
        />
        {errors.description && <p className={errorClass}>{errors.description.message}</p>}
      </div>

      {/* Priority + Status row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Priority</label>
          <select {...register('priority')} className={inputClass}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={inputClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category + Due Date row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select {...register('category')} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            {...register('dueDate')}
            className={inputClass}
          />
        </div>
      </div>

      {/* Estimated Time + Tags row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Estimated Time (minutes)</label>
          <input
            type="number"
            {...register('estimatedTime', {
              min: { value: 0, message: 'Must be positive' },
              max: { value: 480, message: 'Max 480 minutes' },
            })}
            className={`${inputClass} ${errors.estimatedTime ? 'border-danger-500' : ''}`}
            placeholder="e.g. 60"
          />
          {errors.estimatedTime && <p className={errorClass}>{errors.estimatedTime.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            {...register('tags')}
            className={inputClass}
            placeholder="e.g. frontend, urgent"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-dark-500/50">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </motion.form>
  );
}
