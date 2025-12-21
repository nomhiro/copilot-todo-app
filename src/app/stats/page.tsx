import { getTodos } from '@/lib/data/mockTodos';
import { calculateStats, getPriorityBreakdown, getProductivityScore } from '@/lib/utils/statsUtils';

export default function StatsPage() {
  const todos = getTodos();
  const stats = calculateStats(todos);
  const priorityBreakdown = getPriorityBreakdown(todos);
  const productivityScore = getProductivityScore(todos);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">統計ダッシュボード</h1>
        <p className="text-gray-600 mt-1">タスクの進捗状況を確認</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="総タスク数"
          value={stats.total}
          icon="📋"
        />
        <StatCard
          title="完了"
          value={stats.completed}
          icon="✅"
          color="text-green-600"
        />
        <StatCard
          title="未完了"
          value={stats.pending}
          icon="⏳"
          color="text-yellow-600"
        />
        <StatCard
          title="期限超過"
          value={stats.overdue}
          icon="⚠️"
          color="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">完了率</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${stats.completionRate * 2.51} 251`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {stats.completionRate}%
              </span>
            </div>
            <div>
              <p className="text-gray-600">
                {stats.completed} / {stats.total} タスク完了
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">生産性スコア</h2>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-blue-600">
              {productivityScore}
            </div>
            <div className="text-gray-600">
              <p>/ 100</p>
              <p className="text-sm mt-1">
                {productivityScore >= 80 ? '素晴らしい！' :
                 productivityScore >= 60 ? '順調です' :
                 productivityScore >= 40 ? 'もう少し頑張りましょう' :
                 '改善の余地があります'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">優先度別タスク数</h2>
        <div className="space-y-3">
          <PriorityBar
            label="高"
            count={priorityBreakdown.high}
            total={stats.total}
            color="bg-red-500"
          />
          <PriorityBar
            label="中"
            count={priorityBreakdown.medium}
            total={stats.total}
            color="bg-yellow-500"
          />
          <PriorityBar
            label="低"
            count={priorityBreakdown.low}
            total={stats.total}
            color="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color = 'text-gray-900',
}: {
  title: string;
  value: number;
  icon: string;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function PriorityBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-900 font-medium">{count}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
