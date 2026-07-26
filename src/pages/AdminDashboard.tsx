import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Boxes,
  DollarSign,
  Filter,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface InventoryItem {
  sku: string;
  productName: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  color: string;
  stockQuantity: number;
  reorderThreshold: number;
  warehouseLocation: string;
  unitCost: number;
  fabricStatus: 'In Stock' | 'Bulk Fabric Ordered' | 'Dyeing Navy' | 'Low Raw Material';
}

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    sku: 'ZYN-ATLA-XS-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: 'XS',
    color: 'Navy Blue',
    stockQuantity: 42,
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 15.5,
    fabricStatus: 'In Stock',
  },
  {
    sku: 'ZYN-ATLA-S-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: 'S',
    color: 'Navy Blue',
    stockQuantity: 12, // Low Stock Alert
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 15.5,
    fabricStatus: 'Bulk Fabric Ordered',
  },
  {
    sku: 'ZYN-ATLA-M-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: 'M',
    color: 'Navy Blue',
    stockQuantity: 65,
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 15.5,
    fabricStatus: 'In Stock',
  },
  {
    sku: 'ZYN-ATLA-L-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: 'L',
    color: 'Navy Blue',
    stockQuantity: 8, // Low Stock Alert
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 15.5,
    fabricStatus: 'Dyeing Navy',
  },
  {
    sku: 'ZYN-ATLA-XL-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: 'XL',
    color: 'Navy Blue',
    stockQuantity: 28,
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 15.5,
    fabricStatus: 'In Stock',
  },
  {
    sku: 'ZYN-ATLA-2XL-NAVY',
    productName: 'Atlas V-Neck Scrub Top',
    size: '2XL',
    color: 'Navy Blue',
    stockQuantity: 6, // Low Stock Alert
    reorderThreshold: 15,
    warehouseLocation: 'Warehouse A - Bay 12',
    unitCost: 16.0,
    fabricStatus: 'Low Raw Material',
  },
  {
    sku: 'ZYN-MERI-M-NAVY',
    productName: 'Meridian Multi-Pocket Joggers',
    size: 'M',
    color: 'Navy Blue',
    stockQuantity: 54,
    reorderThreshold: 20,
    warehouseLocation: 'Warehouse A - Bay 14',
    unitCost: 18.0,
    fabricStatus: 'In Stock',
  },
  {
    sku: 'ZYN-MERI-S-CEIL',
    productName: 'Meridian Multi-Pocket Joggers',
    size: 'S',
    color: 'Ceil Blue',
    stockQuantity: 9, // Low Stock Alert
    reorderThreshold: 20,
    warehouseLocation: 'Warehouse A - Bay 14',
    unitCost: 18.0,
    fabricStatus: 'Bulk Fabric Ordered',
  },
  {
    sku: 'ZYN-ELEM-L-TEAL',
    productName: 'Element Clinical Scrub Set',
    size: 'L',
    color: 'Teal',
    stockQuantity: 38,
    reorderThreshold: 10,
    warehouseLocation: 'Warehouse B - Bay 02',
    unitCost: 31.0,
    fabricStatus: 'In Stock',
  },
];

export default function AdminDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch real-time data from Express + MongoDB backend (fallback to initial state)
  useEffect(() => {
    fetchBackendInventory();
  }, []);

  const fetchBackendInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/inventory');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setInventory(data);
        }
      }
    } catch (err) {
      // Backend standalone fallback
    } finally {
      setLoading(false);
    }
  };

  const handleRestock = async (sku: string, amount: number = 50) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, stockQuantity: item.stockQuantity + amount, fabricStatus: 'In Stock' } : item
      )
    );

    try {
      const item = inventory.find((i) => i.sku === sku);
      if (item) {
        await fetch(`http://localhost:5000/api/inventory/${sku}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stockQuantity: item.stockQuantity + amount, fabricStatus: 'In Stock' }),
        });
      }
    } catch (err) {}
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.color.toLowerCase().includes(search.toLowerCase());
    const matchesSize = selectedSize === 'All' || item.size === selectedSize;
    const matchesLowStock = !onlyLowStock || item.stockQuantity <= item.reorderThreshold;
    return matchesSearch && matchesSize && matchesLowStock;
  });

  const lowStockCount = inventory.filter((i) => i.stockQuantity <= i.reorderThreshold).length;
  const totalUnits = inventory.reduce((sum, i) => sum + i.stockQuantity, 0);
  const inventoryValuation = inventory.reduce((sum, i) => sum + i.stockQuantity * i.unitCost, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="container-px max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="chip bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30">
                MERN Stack Admin Portal
              </span>
              <span className="chip bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
                MongoDB Synced
              </span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-white">
              Inventory & Stock Management System
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Real-time SKU tracking, automated low-stock warnings, and bulk fabric ordering for ZYNEX Scrubs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBackendInventory}
              className="btn bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2.5 text-sm flex items-center gap-2"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Sync Database
            </button>
            <button
              onClick={() => handleRestock('ZYN-ATLA-S-NAVY', 100)}
              className="btn-primary text-sm px-4 py-2.5 flex items-center gap-2 shadow-lg shadow-teal-500/20"
            >
              <Plus size={16} />
              Quick Fabric Order
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total SKUs</span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-500/20 text-teal-300">
                <Boxes size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-white">{inventory.length}</p>
            <p className="mt-1 text-xs text-slate-400">Active scrub variants (XS to 3XL)</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Stock Units</span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300">
                <Layers size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-white">{totalUnits.toLocaleString()}</p>
            <p className="mt-1 text-xs text-teal-300 font-medium">92/8 Poly-Spandex Knitted Fabric</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Low Stock Warnings</span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/20 text-rose-400">
                <AlertTriangle size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-rose-400">{lowStockCount}</p>
            <p className="mt-1 text-xs text-rose-300/80 font-medium">SKUs below reorder threshold</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Inventory Valuation</span>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-emerald-400">
              ${inventoryValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-xs text-slate-400">Asset cost basis</p>
          </div>
        </div>

        {/* Fabric Specification Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B192C] to-slate-900 border border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-teal-300" />
            <div>
              <p className="text-sm font-semibold text-white">Fabric Specification Profile: Sample A (Navy Preferred)</p>
              <p className="text-xs text-slate-400">92% Polyester, 8% Spandex · 200-220 GSM · Antimicrobial, Fluid Repellent, 4-Way Stretch</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs">
              Quality Rating: 100% Passed
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[240px]">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search SKU, Product, or Color…"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-slate-400 flex items-center gap-1">
                <Filter size={14} /> Size:
              </span>
              {['All', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSize === sz
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setOnlyLowStock((prev) => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-2 ${
              onlyLowStock
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <AlertTriangle size={14} />
            {onlyLowStock ? 'Showing Low Stock Alerts Only' : 'Show Low Stock Alerts'}
          </button>
        </div>

        {/* Real-time Inventory SKU Table */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">SKU Code</th>
                  <th className="py-4 px-5">Scrub Product</th>
                  <th className="py-4 px-5">Size</th>
                  <th className="py-4 px-5">Color</th>
                  <th className="py-4 px-5">Stock Level</th>
                  <th className="py-4 px-5">Fabric Order Status</th>
                  <th className="py-4 px-5">Unit Cost</th>
                  <th className="py-4 px-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInventory.map((item) => {
                  const isLow = item.stockQuantity <= item.reorderThreshold;
                  return (
                    <tr key={item.sku} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-5 font-mono text-xs font-bold text-teal-300">{item.sku}</td>
                      <td className="py-4 px-5 font-medium text-white">{item.productName}</td>
                      <td className="py-4 px-5">
                        <span className="chip bg-slate-800 text-slate-200 border border-slate-700 font-bold">
                          {item.size}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                          <span
                            className="h-2.5 w-2.5 rounded-full ring-1 ring-white/40"
                            style={{
                              backgroundColor:
                                item.color === 'Navy Blue'
                                  ? '#0B192C'
                                  : item.color === 'Ceil Blue'
                                  ? '#7FB2D9'
                                  : item.color === 'Teal'
                                  ? '#0DA39C'
                                  : '#1C70F0',
                            }}
                          />
                          {item.color}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isLow ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {item.stockQuantity} units
                          </span>
                          {isLow && (
                            <span className="chip bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] uppercase font-bold flex items-center gap-1">
                              <AlertTriangle size={10} /> Low Stock
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`chip text-xs font-semibold ${
                            item.fabricStatus === 'In Stock'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : item.fabricStatus === 'Bulk Fabric Ordered'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : item.fabricStatus === 'Dyeing Navy'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {item.fabricStatus}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-medium text-slate-300">${item.unitCost.toFixed(2)}</td>
                      <td className="py-4 px-5">
                        <button
                          onClick={() => handleRestock(item.sku, 50)}
                          className="btn bg-teal-500/20 hover:bg-teal-500/40 text-teal-300 border border-teal-500/30 text-xs px-3 py-1.5 font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Plus size={12} /> Restock +50
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
