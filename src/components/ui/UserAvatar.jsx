export default function UserAvatar({ name }) {
  const getInitials = (name) => {
    if (!name) return 'JM'; // Default fallback
    const names = name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
    }
    return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
  };

  return (
    <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-sm">
        {getInitials(name)}
      </span>
    </div>
  );
}