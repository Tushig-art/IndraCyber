import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Data Types
export interface ClassSchedule {
  id: string;
  grade: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
}

export interface Club {
  id: string;
  name: string;
  type: string;
  day: string;
  time: string;
  teacher: string;
  room: string;
}

export interface PsychologistHour {
  id: string;
  day: string;
  time: string;
  psychologist: string;
  qrCode: string;
}

export interface MenuItem {
  id: string;
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
}

export interface Rule {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  createdAt: string;
}

export interface AppData {
  classSchedules: ClassSchedule[];
  clubs: Club[];
  psychologistHours: PsychologistHour[];
  menu: MenuItem[];
  rules: Rule[];
  events: Event[];
}

interface DataContextType {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
  addItem: <K extends keyof AppData>(category: K, item: AppData[K][number]) => void;
  updateItem: <K extends keyof AppData>(category: K, id: string, item: Partial<AppData[K][number]>) => void;
  deleteItem: <K extends keyof AppData>(category: K, id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial mock data
const initialData: AppData = {
  classSchedules: [
    { id: '1', grade: '9А', day: 'Даваа', time: '08:00-08:45', subject: 'Математик', teacher: 'Б.Сарнай' },
    { id: '2', grade: '9А', day: 'Даваа', time: '08:55-09:40', subject: 'Монгол хэл', teacher: 'Д.Болормаа' },
    { id: '3', grade: '9А', day: 'Даваа', time: '09:50-10:35', subject: 'Англи хэл', teacher: 'С.Оюунаа' },
    { id: '4', grade: '9А', day: 'Мягмар', time: '08:00-08:45', subject: 'Физик', teacher: 'Ж.Батаа' },
    { id: '5', grade: '10Б', day: 'Даваа', time: '08:00-08:45', subject: 'Хими', teacher: 'Г.Энхтуяа' },
    { id: '6', grade: '10Б', day: 'Даваа', time: '08:55-09:40', subject: 'Биologi', teacher: 'Н.Цэцэг' },
  ],
  clubs: [
    { id: '1', name: 'Робот бүтээх', type: 'Шинжлэх ухаан', day: 'Даваа', time: '15:00-16:30', teacher: 'Ц.Бат-Эрдэнэ', room: 'Лаборатори 1' },
    { id: '2', name: 'Программчлал', type: 'Технологи', day: 'Лхагва', time: '15:00-16:30', teacher: 'Д.Ганболд', room: 'IT танхим' },
    { id: '3', name: 'Дуу хөгжим', type: 'Урлаг', day: 'Мягмар', time: '16:00-17:00', teacher: 'С.Саранцэцэг', room: 'Хөгжмийн танхим' },
    { id: '4', name: 'Хөл бөмбөг', type: 'Спорт', day: 'Пүрэв', time: '15:30-17:00', teacher: 'Б.Төмөр', room: 'Спорт зал' },
    { id: '5', name: 'Зураг зурах', type: 'Урлаг', day: 'Баасан', time: '15:00-16:30', teacher: 'Н.Оюунчимэг', room: 'Урлагийн танхим' },
  ],
  psychologistHours: [
    { id: '1', day: 'Даваа - Баасан', time: '09:00-17:00', psychologist: 'М.Энхжаргал', qrCode: 'https://example.com/register' },
  ],
  menu: [
    { id: '1', day: 'Даваа', breakfast: 'Сүүтэй будаа, Өндөг, Талх, Цай', lunch: 'Шөл, Будаатай мах, Салат, Жимс', snack: 'Жүүс, Боов' },
    { id: '2', day: 'Мягмар', breakfast: 'Талх, Жийм, Бяслаг, Сүү', lunch: 'Гурилтай шөл, Бууз, Ногооны салат', snack: 'Жүүс, Самар' },
    { id: '3', day: 'Лхагва', breakfast: 'Овъёостой будаа, Жимс, Цай', lunch: 'Борщ, Макарон, Махтай салат, Талх', snack: 'Жүүс, Бялуу' },
    { id: '4', day: 'Пүрэв', breakfast: 'Өндөгний омлет, Сосис, Талх, Какао', lunch: 'Тахианы шөл, Цуйван, Салат', snack: 'Сүү, Жигнэмэг' },
    { id: '5', day: 'Баасан', breakfast: 'Будаатай хуурга, Талх, Цай', lunch: 'Шөл, Пицца, Салат, Жүүс', snack: 'Жүүс, Боов' },
  ],
  rules: [
    { id: '1', title: 'Цагийн дэг', description: 'Хичээлд цагтаа орох, хоцрохгүй байх', icon: 'Clock' },
    { id: '2', title: 'Дүрэмт хувцас', description: 'Сургуулийн дүрэмт хувцас өмсөх', icon: 'Shirt' },
    { id: '3', title: 'Эелдэг зан', description: 'Багш, найзуудтайгаа эелдэг харилцах', icon: 'Heart' },
    { id: '4', title: 'Цэвэр байдал', description: 'Танхим, орчноо цэвэрхэн байлгах', icon: 'Sparkles' },
    { id: '5', title: 'Ном хэрэгсэл', description: 'Хичээлийн хэрэгслээ бүрэн авчрах', icon: 'BookOpen' },
    { id: '6', title: 'Гар утас', description: 'Хичээлийн үед гар утас хэрэглэхгүй', icon: 'Smartphone' },
  ],
  events: [
    { 
      id: '1', 
      title: 'Шинэ оны баяр', 
      description: 'Сургуулийн шинэ оны үдэшлэг болно. Бүх сурагчид уригдсан.', 
      date: '2024-12-25', 
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543',
      createdAt: new Date().toISOString()
    },
    { 
      id: '2', 
      title: 'Спортын уралдаан', 
      description: 'Ангиудын хоорондын спортын уралдаан эхэлнэ.', 
      date: '2024-12-20', 
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    { 
      id: '3', 
      title: 'Робот бүтээлийн үзэсгэлэн', 
      description: 'Оюутнуудын бүтээсэн роботуудын үзэсгэлэн', 
      date: '2024-12-18', 
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
  ],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('indra-school-data');
    return stored ? JSON.parse(stored) : initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('indra-school-data', JSON.stringify(data));
  }, [data]);

  // Auto-refresh simulation (in real app, this would poll API/Google Sheets)
  useEffect(() => {
    const interval = setInterval(() => {
      // Check localStorage for updates (simulates external updates)
      const stored = localStorage.getItem('indra-school-data');
      if (stored) {
        const newData = JSON.parse(stored);
        setData(newData);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const addItem = <K extends keyof AppData>(category: K, item: AppData[K][number]) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], item],
    }));
  };

  const updateItem = <K extends keyof AppData>(
    category: K,
    id: string,
    updatedItem: Partial<AppData[K][number]>
  ) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map((item: any) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  const deleteItem = <K extends keyof AppData>(category: K, id: string) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter((item: any) => item.id !== id),
    }));
  };

  return (
    <DataContext.Provider value={{ data, updateData, addItem, updateItem, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
