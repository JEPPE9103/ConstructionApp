// src/pages/Salary/SalaryOverview.tsx
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getCurrentUserWithRole } from '../../utils/auth';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface TimeReport {
  id: string;
  userId: string;
  date: string;
  hours: number;
  description: string;
}

interface Salary {
  id: string;
  userId: string;
  month: string;
  salaryAmount: number;
  comment?: string;
  createdAt: any;
}

interface MonthlySummary {
  month: string;
  salary: Salary | null;
  totalHours: number;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

const SalaryOverview: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    month: '',
    salaryAmount: '',
    comment: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthlySummaries, setMonthlySummaries] = useState<MonthlySummary[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const user = await getCurrentUserWithRole();
      if (!user) {
        setError(t('not_logged_in'));
        setLoading(false);
        return;
      }

      // Hämta löner
      const salariesRef = collection(db, 'salaries');
      const salariesQuery = query(salariesRef, where('userId', '==', user.uid));
      const salariesSnapshot = await getDocs(salariesQuery);
      const salaries = salariesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Salary[];

      // Hämta tidrapporter
      const reportsRef = collection(db, 'timereports');
      const reportsQuery = query(reportsRef, where('userId', '==', user.uid));
      const reportsSnapshot = await getDocs(reportsQuery);
      const reports = reportsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TimeReport[];

      // Skapa månatliga sammanfattningar
      const summaries: MonthlySummary[] = [];
      const months = new Set([...salaries.map(s => s.month), ...reports.map(r => r.date.substring(0, 7))]);

      months.forEach(month => {
        const monthSalary = salaries.find(s => s.month === month) || null;
        const monthReports = reports.filter(r => r.date.startsWith(month));
        const totalHours = monthReports.reduce((sum, report) => sum + report.hours, 0);

        summaries.push({
          month,
          salary: monthSalary,
          totalHours
        });
      });

      // Sortera efter månad (nyast först)
      summaries.sort((a, b) => b.month.localeCompare(a.month));
      setMonthlySummaries(summaries);
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
    if (!formData.salaryAmount || isNaN(Number(formData.salaryAmount)) || Number(formData.salaryAmount) <= 0) {
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
        companyId: user.companyId,
        month: formData.month,
        salaryAmount: Number(formData.salaryAmount),
        comment: formData.comment.trim() || null,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'salaries'), salaryData);
      console.log('Salary saved');
      
      setSuccess(t('salary_saved'));
      setFormData({
        month: '',
        salaryAmount: '',
        comment: ''
      });

      // Uppdatera listan
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
    return <div>{t('loading')}</div>;
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">{t('salary_and_timereports')}</h1>

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
          <Label htmlFor="salaryAmount">{t('salary_amount')}</Label>
          <Input
            type="number"
            id="salaryAmount"
            name="salaryAmount"
            value={formData.salaryAmount}
            onChange={handleChange}
            min="0"
            step="100"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="comment">{t('comment')}</Label>
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

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('monthly_overview')}</h2>
        {monthlySummaries.length === 0 ? (
          <p>{t('no_salaries_or_timereports_found')}</p>
        ) : (
          monthlySummaries.map(summary => (
            <MonthlyCard key={summary.month}>
              <h3 className="text-lg font-semibold mb-2">
                {formatMonth(summary.month)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">{t('worked_hours')}</p>
                  <p className="text-xl font-semibold">{summary.totalHours} {t('hours')}</p>
                </div>
                {summary.salary && (
                  <div>
                    <p className="text-gray-600">{t('salary')}</p>
                    <p className="text-xl font-semibold">
                      {summary.salary.salaryAmount.toLocaleString()} {t('kr')}
                    </p>
                    {summary.salary.comment && (
                      <p className="text-sm text-gray-500 mt-1">
                        {summary.salary.comment}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </MonthlyCard>
          ))
        )}
      </div>
    </Container>
  );
};

export default SalaryOverview;
