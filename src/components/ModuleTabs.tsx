import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ModuleContent {
  title: string;
  info: string;
}

interface ModuleData {
  title: string;
  content: ModuleContent[];
}

const moduleData: Record<string, ModuleData> = {
  schedules: {
    title: "Academic Schedules",
    content: [
      {
        title: "Fall 2024 Semester",
        info: "Classes: Aug 28 - Dec 15<br/>Midterms: Oct 14-18<br/>Finals: Dec 11-15<br/>Registration opens: April 1"
      },
      {
        title: "Spring 2025 Semester", 
        info: "Classes: Jan 15 - May 10<br/>Spring Break: Mar 10-14<br/>Finals: May 6-10<br/>Registration opens: Nov 1"
      },
      {
        title: "Summer Sessions",
        info: "Session I: May 27 - Jul 3<br/>Session II: Jul 7 - Aug 14<br/>Full Summer: May 27 - Aug 14"
      }
    ]
  },
  facilities: {
    title: "Campus Facilities",
    content: [
      {
        title: "Recreation Center",
        info: "Hours: Mon-Fri 6am-11pm, Sat-Sun 8am-10pm<br/>Features: Pool, gym, courts, climbing wall<br/>Student ID required"
      },
      {
        title: "Student Union",
        info: "Hours: Mon-Thu 7am-12am, Fri 7am-2am, Sat 9am-2am, Sun 9am-12am<br/>Services: Food court, bookstore, study spaces"
      },
      {
        title: "Computer Labs", 
        info: "24/7 access with student ID<br/>Locations: Library, Engineering Building, Student Center<br/>Software: Office, Adobe Creative Suite, programming tools"
      }
    ]
  },
  events: {
    title: "Campus Events",
    content: [
      {
        title: "This Week's Highlights",
        info: "Mon: Career Fair (Student Union, 10am-4pm)<br/>Wed: Guest Lecture - AI in Healthcare (Auditorium, 7pm)<br/>Fri: Movie Night - Outdoor Cinema (Quad, 8pm)"
      },
      {
        title: "Upcoming Festivals",
        info: "Cultural Diversity Week: Oct 15-21<br/>Homecoming: Nov 2-5<br/>Spring Arts Festival: Mar 20-25"
      },
      {
        title: "Student Organizations",
        info: "Over 200 active clubs<br/>Weekly club fair: Wednesdays 12-2pm<br/>Leadership workshops monthly"
      }
    ]
  },
  dining: {
    title: "Dining Services", 
    content: [
      {
        title: "Main Cafeteria",
        info: "Hours: 7am-9pm daily<br/>All-you-can-eat meal plans<br/>Special diets accommodated<br/>Location: Student Union Ground Floor"
      },
      {
        title: "Food Court Options",
        info: "Pizza Station, Asian Express, Grill & Go, Salad Bar<br/>Hours: 11am-8pm<br/>Accepts dining dollars and cash"
      },
      {
        title: "Campus Cafés",
        info: "Library Café: 24/7 (vending only after 11pm)<br/>Science Building Café: 8am-4pm<br/>Grab-and-go options available"
      }
    ]
  },
  library: {
    title: "Library Resources",
    content: [
      {
        title: "Operating Hours",
        info: "Mon-Thu: 7am-2am<br/>Fri: 7am-10pm<br/>Sat: 9am-10pm<br/>Sun: 10am-2am<br/>24/7 during finals week"
      },
      {
        title: "Study Spaces", 
        info: "Silent study floors: 3rd & 4th<br/>Group study rooms: Reservable online<br/>24-hour study lounge: Ground floor<br/>Graduate carrels available"
      },
      {
        title: "Research Support",
        info: "Librarian consultations by appointment<br/>Research workshops weekly<br/>Interlibrary loan services<br/>Digital archives access"
      }
    ]
  },
  admin: {
    title: "Administrative Services",
    content: [
      {
        title: "Registrar's Office", 
        info: "Hours: Mon-Fri 8am-5pm<br/>Services: Transcripts, enrollment verification, degree audits<br/>Online services available 24/7"
      },
      {
        title: "Financial Aid",
        info: "Walk-in hours: Mon-Fri 9am-4pm<br/>FAFSA assistance available<br/>Scholarship database online<br/>Payment plans offered"
      },
      {
        title: "Student Services",
        info: "Counseling Center: Mon-Fri 8am-6pm<br/>Health Services: Mon-Fri 8am-5pm<br/>Career Services: Appointments & walk-ins"
      }
    ]
  }
};

const tabs = [
  { id: 'schedules', label: '📅 Schedules' },
  { id: 'facilities', label: '🏢 Facilities' },
  { id: 'events', label: '🎉 Events' },
  { id: 'dining', label: '🍽️ Dining' },
  { id: 'library', label: '📚 Library' },
  { id: 'admin', label: '📋 Admin' }
];

const ModuleTabs = () => {
  const [activeTab, setActiveTab] = useState('schedules');

  return (
    <div className="glass-card p-8 animate-fade-in-up">
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={`campus-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <div className="animate-slide-in">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {moduleData[activeTab]?.title}
        </h2>
        
        <div className="space-y-4">
          {moduleData[activeTab]?.content.map((item, index) => (
            <div key={index} className="info-card">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <div 
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.info }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleTabs;