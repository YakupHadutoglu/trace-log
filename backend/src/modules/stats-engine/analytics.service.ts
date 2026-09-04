import { LogModel } from '../../models/Log';

export class AnalyticsService {
    static async getProjectStats(publicId: string) {
        //*We calculate the start date of the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        //*MongoDB Aggregation Pipeline!
        const stats = await LogModel.aggregate([
            { $match: { projectId: publicId } },
            {
                $facet: {
                    levelDistribution: [
                        { $group: { _id: "$level", count: { $sum: 1 } } }
                    ],
                    last7DaysTrend: [
                        { $match: { timestamp: { $gte: sevenDaysAgo } } },
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { _id: 1 } }
                    ]
                }
            }
        ]);

        const rawStats = stats[0];

        //*We convert it to elegant JSON that the frontend will love
        const formattedLevelDistribution = rawStats.levelDistribution.reduce((acc: any, curr: any) => {
            acc[curr._id] = curr.count;
            return acc;
        }, { info: 0, warn: 0, error: 0, debug: 0, fatal: 0 });

        const totalLogs = Object.values(formattedLevelDistribution).reduce((a: any, b: any) => a + b, 0);

        const formattedTrend = rawStats.last7DaysTrend.map((item: any) => ({
            date: item._id,
            count: item.count
        }));

        return {
            totalLogs,
            levelDistribution: formattedLevelDistribution,
            last7Days: formattedTrend
        };
    }
}
