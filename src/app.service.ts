import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
interface ReportData {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((rep) => rep.type === type)
      .find((rep) => rep.id === id);
  }
  createReport(type: ReportType, { amount, source }: ReportData) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return newReport;
  }
  updateReport(type: ReportType, id: string, body: ReportData) {
    const reportToUpdate = data.report
      .filter((rep) => rep.type === type)
      .find((rep) => rep.id === id);

    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return data.report[reportIndex];
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((rep) => rep.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
