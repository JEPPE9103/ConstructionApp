// ✅ TimeReportCard.tsx
import React, { useState, useEffect } from 'react';
import { Clock, Folder, FileText, Trash2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styled from 'styled-components';
import { getCurrentUserWithRole } from '../../utils/auth';
import { useTranslation } from 'react-i18next';

interface TimeReport {
  id: string;
  userId: string;
  date: string;
  hours: number;
  description: string;
  project: string;
}

interface TimeReportForm {
  date: string;
  hours: string;
  project: string;
  description: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #f5f8ff; /* Ljusblå bakgrund likt bilden */
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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
  min-height: 100px;

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
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ReportCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  position: relative;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ReportContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const ReportField = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeReportCard: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<TimeReportForm>({
    date: '',
    hours: '',
    project: '',
    description: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reports, setReports] = useState<TimeReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      const user = await getCurrentUserWithRole();
      if (!user) {
        setError(t('not_logged_in'));
        setLoading(false);
        return;
      }

      const reportsRef = collection(db, 'timereports');
      const q = query(reportsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      const reportsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TimeReport[];

      // Sortera rapporter efter datum (nyast först)
      reportsData.sort((a, b) => b.date.localeCompare(a.date));
      
      setReports(reportsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError(t('failed_to_fetch_reports'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.date) {
      setError(t('select_date'));
      return false;
    }
    if (!formData.hours || isNaN(Number(formData.hours)) || Number(formData.hours) <= 0) {
      setError(t('enter_valid_hours'));
      return false;
    }
    if (!formData.project.trim()) {
      setError(t('enter_project'));
      return false;
    }
    if (!formData.description.trim()) {
      setError(t('enter_description'));
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
      const timeReportData = {
        userId: user.uid,
        companyId: user.companyId,
        date: formData.date,
        hours: Number(formData.hours),
        project: formData.project.trim(),
        description: formData.description.trim(),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'timereports'), timeReportData);
      console.log('Report created');
      
      setSuccess(t('report_saved'));
      setFormData({
        date: '',
        hours: '',
        project: '',
        description: ''
      });

      // Uppdatera listan
      await fetchReports();
    } catch (err) {
      console.error('Error creating time report:', err);
      setError(t('failed_to_create_report'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reportId: string) => {
    if (!window.confirm(t('confirm_delete_report'))) {
      return;
    }

    setIsDeleting(reportId);
    try {
      await deleteDoc(doc(db, 'timereports', reportId));
      setSuccess(t('report_deleted'));
      await fetchReports();
    } catch (err) {
      console.error('Error deleting report:', err);
      setError(t('failed_to_delete_report'));
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <h1 className="text-2xl font-bold mb-6">{t('time_reports')}</h1>

      <Form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">{t('register_time')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormGroup>
            <Label htmlFor="date">{t('date')}</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="hours">{t('hours')}</Label>
            <Input
              type="number"
              id="hours"
              name="hours"
              min="0.5"
              step="0.5"
              value={formData.hours}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="project">{t('project')}</Label>
          <Input
            type="text"
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">{t('description')}</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('saving') : t('save_report')}
        </SubmitButton>
      </Form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t('my_time_reports')}</h2>
        {reports.length === 0 ? (
          <p>{t('no_reports_found')}</p>
        ) : (
          reports.map(report => (
            <ReportCard key={report.id}>
              <ReportHeader>
                <h3 className="text-lg font-semibold">
                  {formatDate(report.date)}
                </h3>
                <DeleteButton
                  onClick={() => handleDelete(report.id)}
                  disabled={isDeleting === report.id}
                >
                  <Trash2 size={16} />
                  {isDeleting === report.id ? t('deleting') : t('delete')}
                </DeleteButton>
              </ReportHeader>
              
              <ReportContent>
                <ReportField>
                  <Clock size={18} className="text-blue-400" />
                  <span>{report.hours} {t('hours')}</span>
                </ReportField>
                
                <ReportField>
                  <Folder size={18} className="text-blue-400" />
                  <span>{report.project}</span>
                </ReportField>
                
                <ReportField>
                  <FileText size={18} className="text-blue-400" />
                  <span>{report.description}</span>
                </ReportField>
              </ReportContent>
            </ReportCard>
          ))
        )}
      </div>
    </Container>
  );
};

export default TimeReportCard;