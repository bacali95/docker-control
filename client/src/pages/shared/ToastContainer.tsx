import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { rootStore } from '../../core/stores/RootStore';
import { ToastType } from '../../core/stores/ToastsStore';

const colors: Record<ToastType, string> = {
  info: 'gray',
  success: 'green',
  warn: 'yellow',
  error: 'red',
};

const icons: Record<ToastType, React.FC<{ className?: string }>> = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warn: ExclamationCircleIcon,
  error: ExclamationCircleIcon,
};

const ToastContainer: React.FC = observer(() => {
  const { toasts, remove } = rootStore.toastsStore;

  return (
    <div className="flex flex-col fixed bottom-8 right-8 z-50 w-80 gap-2">
      {toasts.map(({ id, type, message }) => {
        const Icon = icons[type];

        return (
          <div
            key={id}
            className={classNames(
              `relative grid grid-cols-6 gap-x-4 rounded-xl border shadow-lg bg-white p-4 dark:bg-gray-800 dark:text-white`,
              {
                'border-gray-500': colors[type] === 'gray',
                'border-green-500': colors[type] === 'green',
                'border-yellow-500': colors[type] === 'yellow',
                'border-red-500': colors[type] === 'red',
              },
            )}
          >
            <div className="flex items-center justify-center">
              <Icon
                className={classNames('h-10 w-10', {
                  'text-gray-500': colors[type] === 'gray',
                  'text-green-500': colors[type] === 'green',
                  'text-yellow-500': colors[type] === 'yellow',
                  'text-red-500': colors[type] === 'red',
                })}
              />
            </div>
            <div className="col-span-5 flex items-center">{message}</div>
            <XIcon
              className="absolute w-6 h-6 top-1 right-1 p-1 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => remove(id)}
            />
          </div>
        );
      })}
    </div>
  );
});

export default ToastContainer;
