export default function ProfileStats() {
  return (
    <div className="bg-gray-50 px-8 py-6 border-t grid grid-cols-3 text-center">
      <div>
        <h3 className="text-2xl font-bold text-gray-800">120</h3>
        <p className="text-sm text-gray-500">Connections</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">15</h3>
        <p className="text-sm text-gray-500">Projects</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">35</h3>
        <p className="text-sm text-gray-500">Skill Swaps</p>
      </div>
    </div>
  );
}
