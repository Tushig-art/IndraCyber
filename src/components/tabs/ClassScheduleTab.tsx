import { useState } from 'react';
import { ClassSchedule } from '../../contexts/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Props {
  schedules: ClassSchedule[];
}

export default function ClassScheduleTab({ schedules }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const grades = Array.from(new Set(schedules.map(s => s.grade)));
  const days = ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан'];

  const filteredSchedules = schedules.filter(s => {
    const gradeMatch = selectedGrade === 'all' || s.grade === selectedGrade;
    const dayMatch = selectedDay === 'all' || s.day === selectedDay;
    return gradeMatch && dayMatch;
  });

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl">Хичээлийн хуваарь</CardTitle>
          
          <div className="flex gap-3">
            {/* Grade Select */}
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Анги сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх анги</SelectItem>
                {grades.map(grade => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Day Select */}
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Өдөр сонгох" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх өдөр</SelectItem>
                {days.map(day => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                <TableHead>Өдөр</TableHead>
                <TableHead>Цаг</TableHead>
                <TableHead>Хичээл</TableHead>
                <TableHead>Багш</TableHead>
                {selectedGrade === 'all' && <TableHead>Анги</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow 
                  key={schedule.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <TableCell>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg">
                      {schedule.day}
                    </span>
                  </TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.subject}</TableCell>
                  <TableCell>{schedule.teacher}</TableCell>
                  {selectedGrade === 'all' && (
                    <TableCell>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg">
                        {schedule.grade}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}