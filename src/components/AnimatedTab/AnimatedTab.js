import { useState } from 'react';
import './app.css';
import i18n from '../../i18n/i18n';

export function AnimatedTab({activeTab, handleTabClick}) {
  

  return (
    <div className="animated-tab-container">
      <div className="animated-tab-header">
        <div
          className={`animated-tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => handleTabClick('description')}
        >
          {i18n.t('CourseDetailsDescription')}
        </div>
        <div
          className={`animated-tab ${activeTab === 'instructors' ? 'active' : ''}`}
          onClick={() => handleTabClick('instructors')}
        >
        {i18n.t('CourseDetailsInstructors')}

        </div>
        {/* <div
          className={`animated-tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </div> */}
      </div>
    </div>
    
  );
}
