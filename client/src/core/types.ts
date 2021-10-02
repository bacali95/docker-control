import React from 'react';

export type Tabs = {
  key: string;
  title: string;
  icon: React.FC<React.ComponentProps<'svg'>>;
  label?: React.ReactNode;
}[];
