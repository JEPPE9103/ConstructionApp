import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getCurrentUserWithRole } from '../utils/auth';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface TimeReport {
  id: string;
  userId: string;
  date: string;
  hours: number;
  description: string;
  project: string;
}

interface Salary {
  id: string;
  userId: string;
  month: string;
  gross: number;
  comment?: string;
  createdAt: any;
}

interface MonthlySummary {
  month: string;
  salary: Salary | null;
  totalHours: number;
}

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #f5f8ff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
`;

const MonthlyCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const Salary: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    month: '',
    gross: '',
    comment: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const user = await getCurrentUserWithRole();
      if (!user) {
        setError(t('not_logged_in'));
        setLoading(false);
        return;
      }

      // Hämta lön för aktuell månad
      const currentMonth = new Date().toISOString().substring(0, 7);
      const salariesRef = collection(db, 'salaries');
      const salariesQuery = query(
        salariesRef, 
        where('userId', '==', user.uid),
        where('month', '==', currentMonth)
      );
      const salariesSnapshot = await getDocs(salariesQuery);
      const salary = salariesSnapshot.docs[0]?.data() as Salary | undefined;

      // Hämta tidrapporter för aktuell månad
      const reportsRef = collection(db, 'timereports');
      const reportsQuery = query(
        reportsRef,
        where('userId', '==', user.uid),
        where('date', '>=', `${currentMonth}-01`),
        where('date', '<=', `${currentMonth}-31`)
      );
      const reportsSnapshot = await getDocs(reportsQuery);
      const reports = reportsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TimeReport[];

      // Beräkna totala timmar
      const totalHours = reports.reduce((sum, report) => sum + report.hours, 0);

      setMonthlySummary({
        month: currentMonth,
        salary: salary || null,
        totalHours
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(t('could_not_fetch_data'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.month) {
      setError(t('select_month'));
      return false;
    }
    if (!formData.gross || isNaN(Number(formData.gross)) || Number(formData.gross) <= 0) {
      setError(t('enter_valid_salary_amount'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    const user = await getCurrentUserWithRole();
    if (!user) {
      setError(t('not_logged_in'));
      return;
    }

    setIsSubmitting(true);

    try {
      const salaryData = {
        userId: user.uid,
        month: formData.month,
        gross: Number(formData.gross),
        comment: formData.comment.trim() || null,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'salaries'), salaryData);
      setSuccess(t('salary_saved'));
      setFormData({
        month: '',
        gross: '',
        comment: ''
      });
      await fetchData();
    } catch (err) {
      console.error('Error saving salary:', err);
      setError(t('could_not_save_salary'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">{t('salary_and_timereports')}</h1>

      {!monthlySummary?.salary ? (
        <Form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">{t('register_salary')}</h2>
          
          <FormGroup>
            <Label htmlFor="month">{t('month')}</Label>
            <Input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="gross">{t('salary_amount_kr')}</Label>
            <Input
              type="number"
              id="gross"
              name="gross"
              value={formData.gross}
              onChange={handleChange}
              min="0"
              step="100"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="comment">{t('comment_optional')}</Label>
            <TextArea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('saving') : t('save_salary')}
          </SubmitButton>
        </Form>
      ) : (
        <MonthlyCard>
          <h2 className="text-xl font-semibold mb-4">
            {formatMonth(monthlySummary.month)}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">🗓️ {t('month')}:</span>
              <span>{formatMonth(monthlySummary.month)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">🕐 {t('worked_hours')}:</span>
              <span>{monthlySummary.totalHours} {t('hours')}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">💰 {t('salary_gross')}:</span>
              <span>{monthlySummary.salary.gross.toLocaleString()} {t('kr')}</span>
            </div>

            {monthlySummary.salary.comment && (
              <div className="mt-4 text-sm text-gray-500">
                <span className="font-medium">{t('comment')}:</span> {monthlySummary.salary.comment}
              </div>
            )}
          </div>
        </MonthlyCard>
      )}
    </Container>
  );
};

export default Salary; 