/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare let wx: any;

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
  }
}

type Obj = Record<string, any>;

type AjaxResponse<T> = {
  success: boolean;
  code: number;
  data: T;
  message: string;
};

type Page<T = any> = {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
};

interface TaskRecord {
  id: number;
  endTime: string;
  workerName: string;
  workDesc: string;
  imgs: string[];
  comment?: string;
  commentPerson?: string;
}

interface Task {
  id: number;
  base: string;
  name: string;
  status: string;
  endTime: string;
  remark?: string;
}

interface Tree {
  id: number;
  code: string;
  category: string;
  longitude: number;
  latitude: number;
  plantTime: string;
  imgs: string[];
}

interface Monitor {
  id: number;
  name: string;
  type: string;
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
