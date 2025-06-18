// import Sidebar from "../components/ui/Sidebar";
// import Navbar from "../components/ui/Navbar";

// export default function SupplierLayout({ children }) {
//   return (
//     <div className="flex h-screen ">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Navbar />
//         <main className="p-4 overflow-y-auto">{children}</main>
//       </div>
//     </div>
//   );
// }
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";

export default function SupplierLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}