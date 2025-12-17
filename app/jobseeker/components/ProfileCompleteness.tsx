import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import React from 'react';

const ProfileCompleteness = () => {
  const profileItems = [
    { name: 'Basic Information', completed: true },
    { name: 'Resume Upload', completed: false },
    { name: 'Skills Added', completed: true },
    { name: 'Work Experience', completed: false },
  ];

  const completedCount = profileItems.filter(item => item.completed).length;
  const totalCount = profileItems.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 font-playfair">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold font-playfair">
          Profile Completeness
        </h2>
        <div className="text-sm sm:text-base font-medium">
          <span className="text-green-600">{percentage}%</span> complete
        </div>
      </div>

     
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profileItems.map((item, index) => (
          <button
            key={index}
            className={`
              flex items-center justify-between gap-3 
              px-5 py-3 rounded-xl text-left transition-all duration-300
              ${item.completed 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
            disabled={item.completed}
          >
            <span className="font-medium text-base sm:text-lg">
              {item.name}
            </span>
            {item.completed && (
              <Check className="h-5 w-5" />
            )}
          </button>
        ))}
      </div>

  
      {percentage < 100 && (
        <Button 
          className="mt-2 py-5 text-lg font-medium w-fully"
          onClick={() => alert('Redirect to edit page')} 
        >
          Complete Profile Now
        </Button>
      )}

  
      {percentage === 100 && (
        <p className="text-center text-green-600 font-medium">
          Great job! Your profile is 100% complete
        </p>
      )}
    </div>
  );
};

export default ProfileCompleteness;