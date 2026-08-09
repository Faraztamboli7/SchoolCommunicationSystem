import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Communications",
    value: "128",
    description: "12% this month",
    icon: FileText,
  },
  {
    title: "Drafts",
    value: "14",
    description: "Awaiting publication",
    icon: Clock3,
  },
  {
    title: "Published",
    value: "86",
    description: "Active communications",
    icon: CheckCircle2,
  },
  {
    title: "Pending Acknowledgements",
    value: "23",
    description: "Requires attention",
    icon: AlertCircle,
  },
];

export default function Dashboard() {
  return (
    <section className="p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Good evening, Admin 👋
        </h1>

        <p className="text-slate-500 mt-1">
          Here's what's happening with your school communications.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-900 mt-3">
                    {stat.value}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    {stat.description}
                  </p>

                </div>

                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Recent Communications */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="p-6 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-lg">
              Recent Communications
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Latest notices and announcements
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all →
          </button>

        </div>

        <div className="divide-y divide-slate-100">

          {[
            ["Annual Sports Day", "Event Information", "Published"],
            ["Mid-Term Examination Schedule", "Exam Notice", "Scheduled"],
            ["Fee Payment Reminder", "Fee Reminder", "Draft"],
          ].map(([title, type, status]) => (

            <div
              key={title}
              className="p-5 flex items-center justify-between hover:bg-slate-50 transition"
            >

              <div>

                <h3 className="font-medium text-slate-800">
                  {title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {type}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  status === "Published"
                    ? "bg-green-100 text-green-700"
                    : status === "Scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}