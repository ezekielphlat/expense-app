import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from '../dtos/report.dto';
interface ReportData {
  amount: number;
  source: string;
}
interface UpdateReportData {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((rep) => new ReportResponseDto(rep));
  }
  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((rep) => rep.type === type)
      .find((rep) => rep.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }
  createReport(
    type: ReportType,
    { amount, source }: ReportData,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }
  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportData,
  ): ReportResponseDto {
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
    return new ReportResponseDto(data.report[reportIndex]);
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((rep) => rep.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
