import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import Card from '../../../components/ui/Card';

const factoryData = [
    { factory: 'Factory A', teaPayment: 500000, loan: 120000, advance: 70000 },
    { factory: 'Factory B', teaPayment: 350000, loan: 90000, advance: 50000 },
    { factory: 'Factory C', teaPayment: 250000, loan: 80000, advance: 40000 },
    { factory: 'Factory D', teaPayment: 150000, loan: 60000, advance: 20000 },
];

const COLORS = ['#7CB342', '#3b82f6', '#eab308'];

export default function FactoryDetails({ onClose }) {
    const [search, setSearch] = useState('');

    const filtered = search
        ? factoryData.filter(f =>
            f.factory.toLowerCase().includes(search.toLowerCase())
        )
        : factoryData;

    const totalTea = filtered.reduce((sum, f) => sum + f.teaPayment, 0);
    const totalLoan = filtered.reduce((sum, f) => sum + f.loan, 0);
    const totalAdvance = filtered.reduce((sum, f) => sum + f.advance, 0);

    const summaryData = [
        { name: 'Tea Payment', value: totalTea },
        { name: 'Loan', value: totalLoan },
        { name: 'Advance', value: totalAdvance },
    ];

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative p-6">
                {/* Close Button */}
                <button
                    onClick={onClose ? onClose : () => window.history.back()}
                    className="absolute top-3 right-3 text-ink/40 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark text-2xl font-bold z-10"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b border-tea-100 dark:border-card-border-dark pb-4">
                    <div>
                        <h2 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
                            Factory Payment Details
                        </h2>
                        <p className="text-ink/60 dark:text-muted-dark mt-1 text-sm">
                            Visual breakdown of tea payment, loan, and advance by factory.
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Search factory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark px-3 py-2 mt-4 md:mt-0 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-tea-500/40"
                    />
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-tea-50 dark:bg-tea-900/20 p-4 rounded-lg">
                        <p className="text-tea-800 dark:text-tea-200 font-semibold">Total Tea Payment</p>
                        <p className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">LKR {totalTea.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-200 font-semibold">Total Loans</p>
                        <p className="text-2xl font-heading font-bold text-blue-700 dark:text-blue-300">LKR {totalLoan.toLocaleString()}</p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <p className="text-amber-800 dark:text-amber-200 font-semibold">Total Advances</p>
                        <p className="text-2xl font-heading font-bold text-amber-700 dark:text-amber-300">LKR {totalAdvance.toLocaleString()}</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300 mb-2">Factory Comparison</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={filtered}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="factory" />
                                <YAxis />
                                <Tooltip formatter={v => `LKR ${v.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="teaPayment" fill="#7CB342" name="Tea Payment" />
                                <Bar dataKey="loan" fill="#3b82f6" name="Loan" />
                                <Bar dataKey="advance" fill="#eab308" name="Advance" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    <Card className="flex flex-col items-center justify-center">
                        <h3 className="text-lg font-heading font-semibold text-tea-700 dark:text-tea-300 mb-2">Summary Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={summaryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ name, percent }) =>
                                        `${name} (${(percent * 100).toFixed(0)}%)`
                                    }
                                >
                                    {summaryData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={v => `LKR ${v.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-tea-900">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-white">Factory</th>
                                <th className="px-6 py-3 text-left font-medium text-white">Tea Payment</th>
                                <th className="px-6 py-3 text-left font-medium text-white">Loan</th>
                                <th className="px-6 py-3 text-left font-medium text-white">Advance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
                            {filtered.map(fp => (
                                <tr key={fp.factory} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-ink dark:text-ink-dark">{fp.factory}</td>
                                    <td className="px-6 py-4 text-tea-700 dark:text-tea-300 font-semibold">LKR {fp.teaPayment.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-blue-700 dark:text-blue-300 font-semibold">LKR {fp.loan.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-amber-700 dark:text-amber-300 font-semibold">LKR {fp.advance.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
