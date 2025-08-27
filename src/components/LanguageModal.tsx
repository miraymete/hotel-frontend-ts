import { useState } from "react";

export default function LanguageModal({ open, setOpen }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Dil ve Para Birimi</h2>

        <label className="block mb-2 text-sm">Lisan</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Türkçe</option>
          <option>English</option>
        </select>

        <label className="block mb-2 text-sm">Para Birimi</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>TRY - Türk Lirası</option>
          <option>USD - Dolar</option>
          <option>EUR - Euro</option>
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Kapat
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-lg bg-[#3620D9] text-white hover:bg-[#4230FF]"
          >
            Uygula
          </button>
        </div>
      </div>
    </div>
  );
}
