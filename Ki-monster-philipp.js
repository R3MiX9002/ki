import React, { useState, useEffect } from 'react';
import { 
  Search, Mail, Cloud, Folder, Tag, Filter, Grid, List, 
  User, Settings, LogOut, Upload, Download, Edit, Star,
  Calendar, FileText, Image, Video, Music, Archive,
  Eye, Share, Trash2, Plus, Menu, X, ChevronDown, Bell
} from 'lucide-react';

const CompactEnterprisePlatform = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [activeSection, setActiveSection] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTagEditor, setShowTagEditor] = useState(false);
  const [filterPanel, setFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Data Management
  const [emails, setEmails] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  const quickLinks = [
    'Dokumente', 'Projekte', 'Team', 'Berichte', 'Archiv', 'Tools'
  ];

  const tagSystem = {
    genres: ['Business', 'Personal', 'Kreativ', 'Technisch', 'Akademisch'],
    categories: ['Dokument', 'Bild', 'Video', 'Audio', 'Archiv'],
    priorities: ['Hoch', 'Mittel', 'Niedrig']
  };

  // Sample data initialization
  useEffect(() => {
    const sampleEmails = [
      {
        id: 'email_1',
        from: 'kollege@unternehmen.de',
        subject: 'Projekt Status Update - Q1 2025',
        preview: 'Die quartalsweise Metriken zeigen signifikante Verbesserungen in unseren Schlüsselkennzahlen...',
        timestamp: new Date('2025-01-10T09:30:00'),
        tags: ['Business', 'Hoch'],
        isRead: false,
        isStarred: true
      },
      {
        id: 'email_2',
        from: 'kunde@partner.de',
        subject: 'Meeting Bestätigung - Strategiegespräch',
        preview: 'Vielen Dank für die Terminplanung. Ich bestätige unseren Termin für morgen...',
        timestamp: new Date('2025-01-09T14:15:00'),
        tags: ['Business', 'Mittel'],
        isRead: true,
        isStarred: false
      }
    ];

    const sampleMedia = [
      {
        id: 'media_1',
        name: 'Jahresbericht_2024.pdf',
        type: 'document',
        size: '2.4 MB',
        genre: 'Business',
        category: 'Dokument',
        description: 'Umfassender Jahresbericht mit Finanzanalyse und strategischem Ausblick',
        tags: ['Business', 'Finanzen', 'Jahresbericht'],
        uploadDate: new Date('2025-01-08T10:00:00'),
        metadata: {
          pages: 45,
          author: 'Finanzabteilung',
          version: '1.2'
        }
      },
      {
        id: 'media_3',
        name: 'Team_Meeting_Notes.docx',
        type: 'document',
        size: '1.2 MB',
        genre: 'Business',
        category: 'Dokument',
        description: 'Detaillierte Notizen vom wöchentlichen Team-Meeting mit Aktionspunkten und Entscheidungen',
        tags: ['Meeting', 'Team', 'Planung', 'Protokoll'],
        uploadDate: new Date('2025-01-06T11:20:00'),
        metadata: {
          pages: 12,
          author: 'Team Lead',
          version: '2.1',
          language: 'Deutsch',
          created: '2025-01-06',
          modified: '2025-01-06',
          keywords: ['Meeting', 'Strategie', 'Q1 Planung'],
          confidentiality: 'Intern'
        }
      },
      {
        id: 'media_4',
        name: 'Presentation_Design.pptx',
        type: 'document',
        size: '45 MB',
        genre: 'Kreativ',
        category: 'Dokument',
        description: 'Kundenpräsentation mit innovativen Design-Konzepten und Marktanalyse',
        tags: ['Präsentation', 'Design', 'Kunde', 'Marketing'],
        uploadDate: new Date('2025-01-05T09:15:00'),
        metadata: {
          slides: 28,
          author: 'Design Team',
          version: '3.0',
          language: 'Deutsch',
          created: '2025-01-02',
          modified: '2025-01-05',
          keywords: ['Design', 'Innovation', 'Marktanalyse'],
          confidentiality: 'Vertraulich'
        }
      },
      {
        id: 'media_5',
        name: 'Company_Logo_Variants.zip',
        type: 'archive',
        size: '12 MB',
        genre: 'Kreativ',
        category: 'Archiv',
        description: 'Vollständige Logo-Sammlung mit verschiedenen Formaten und Varianten für Corporate Identity',
        tags: ['Logo', 'Branding', 'Corporate', 'Design'],
        uploadDate: new Date('2025-01-04T14:30:00'),
        metadata: {
          files: 24,
          formats: ['PNG', 'SVG', 'EPS', 'AI'],
          author: 'Brand Team',
          version: '4.2',
          created: '2024-12-15',
          modified: '2025-01-04',
          keywords: ['Branding', 'Identity', 'Visual'],
          confidentiality: 'Öffentlich'
        }
      }
    ];

    setEmails(sampleEmails);
    setMediaFiles(sampleMedia);
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: 'user_theodor_001',
        name: 'Theodor von Haft',
        email: 'theodor.haft@go-monster.de',
        avatar: 'https://via.placeholder.com/40x40/4F46E5/white?text=TH',
        organization: 'Go-Monster Enterprise',
        role: 'Administrator'
      };
      
      setUserProfile(mockUser);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setActiveSection('search');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = [
        {
          id: 'result_1',
          title: `Ergebnisse für "${searchQuery}"`,
          type: 'document',
          snippet: 'Relevante Dokumente und Dateien gefunden...',
          url: '#'
        },
        {
          id: 'result_2',
          title: `E-Mail Treffer für "${searchQuery}"`,
          type: 'email',
          snippet: 'Passende E-Mails in Ihrem Postfach...',
          url: '#'
        }
      ];
      setSearchResults(results);
      setActiveSection('results');
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'document': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'image': return <Image className="w-5 h-5 text-green-400" />;
      case 'video': return <Video className="w-5 h-5 text-red-400" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-400" />;
      default: return <Archive className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        background: 'var(--bg)', 
        color: 'var(--text)',
        minHeight: '100vh',
        fontFamily: 'Inter, ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial'
      }}>
        <style>{`
          :root {
            --bg: #0b1220;
            --card: #0f1724;
            --accent: #4F46E5;
            --muted: #94a3b8;
            --text: #e6eef8;
          }
          * { box-sizing: border-box; }
          body { margin: 0; background: var(--bg); color: var(--text); }
        `}</style>
        
        {/* Navigation */}
        <nav className="nav" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.02), transparent)'
        }}>
          <div className="brand" style={{ fontWeight: 700, letterSpacing: '0.6px' }}>
            Theodor von Haft — Go-Monster
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--text)', textDecoration: 'none' }}>Über</a>
            <a href="#" style={{ color: 'var(--text)', textDecoration: 'none' }}>Kontakt</a>
          </div>
        </nav>

        {/* Main Search Interface */}
        <div className="search-wrap" style={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <div className="logo" style={{
            fontSize: '48px',
            marginBottom: '18px',
            color: 'var(--accent)',
            fontWeight: 800
          }}>
            Enterprise Portal
          </div>

          <div style={{ 
            background: 'var(--card)',
            padding: '24px',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>
              Anmeldung erforderlich
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
              Zugriff auf E-Mail, Dateien und Medien-Management
            </p>
            
            <button
              onClick={handleLogin}
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'var(--accent)',
                border: 'none',
                color: 'white',
                padding: '14px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              ) : (
                <>
                  <User className="w-5 h-5" />
                  OAuth Anmeldung
                </>
              )}
            </button>
          </div>

          <div className="quicklinks" style={{
            marginTop: '14px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {quickLinks.map(link => (
              <div key={link} className="ql" style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '8px 12px',
                borderRadius: '14px',
                color: 'var(--muted)',
                fontSize: '14px'
              }}>
                {link}
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'var(--bg)', 
      color: 'var(--text)',
      minHeight: '100vh',
      fontFamily: 'Inter, ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial'
    }}>
      <style>{`
        :root {
          --bg: #0b1220;
          --card: #0f1724;
          --accent: #4F46E5;
          --muted: #94a3b8;
          --text: #e6eef8;
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); color: var(--text); }
      `}</style>

      {/* Compact Navigation */}
      <nav className="nav" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.02), transparent)'
      }}>
        <div className="brand" style={{ fontWeight: 700, letterSpacing: '0.6px' }}>
          Go-Monster Enterprise
        </div>
        
        {/* Compact Search */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: 'var(--card)',
          borderRadius: '20px',
          padding: '6px 12px',
          minWidth: '300px'
        }}>
          <Search className="w-4 h-4" style={{ color: 'var(--muted)', marginRight: '8px' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Suchen..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              flex: 1,
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveSection('mail')}
            style={{
              background: activeSection === 'mail' ? 'var(--accent)' : 'transparent',
              border: 'none',
              color: 'var(--text)',
              padding: '8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Mail className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActiveSection('analytics')}
            style={{
              background: activeSection === 'analytics' ? 'var(--accent)' : 'transparent',
              border: 'none',
              color: 'var(--text)',
              padding: '8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📊
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            style={{
              background: activeSection === 'settings' ? 'var(--accent)' : 'transparent',
              border: 'none',
              color: 'var(--text)',
              padding: '8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Settings className="w-4 h-4" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={userProfile?.avatar}
              alt={userProfile?.name}
              style={{ width: '28px', height: '28px', borderRadius: '50%' }}
            />
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {userProfile?.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                padding: '4px',
                cursor: 'pointer'
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        {/* Search Results or Dashboard */}
        {activeSection === 'search' || activeSection === 'results' ? (
          <div className="layout" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 320px',
            gap: '20px'
          }}>
            <div className="card" style={{
              background: 'var(--card)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                {searchQuery ? `Ergebnisse für "${searchQuery}"` : 'Dashboard'}
              </h2>
              
              {searchQuery && searchResults.length > 0 ? (
                <div className="results-list" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {searchResults.map(result => (
                    <div key={result.id} className="result" style={{
                      background: 'rgba(255,255,255,0.02)',
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {getFileIcon(result.type)}
                        <h3 style={{ margin: 0, fontSize: '14px' }}>{result.title}</h3>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                        {result.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <Search className="w-16 h-16" style={{ color: 'var(--muted)', margin: '0 auto 16px' }} />
                  <h3 style={{ color: 'var(--muted)', margin: '0 0 8px 0' }}>
                    Keine Suchanfrage
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                    Verwenden Sie die Suchleiste oben für E-Mails und Dateien
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="card" style={{
              background: 'var(--card)',
              padding: '16px',
              borderRadius: '12px'
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Schnellzugriff</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--muted)' }}>
                  Statistiken
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>E-Mails:</span>
                    <span>{emails.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Dateien:</span>
                    <span>{mediaFiles.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Speicher:</span>
                    <span>2.1 GB</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--muted)' }}>
                  Letzte Aktivität
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  <div style={{ marginBottom: '6px' }}>📄 Jahresbericht_2024.pdf</div>
                  <div style={{ marginBottom: '6px' }}>📧 Neue E-Mail erhalten</div>
                  <div>🏷️ Tags aktualisiert</div>
                </div>
              </div>
            </div>
          </div>
        ) : activeSection === 'mail' ? (
          // Email Section
          <div className="card" style={{
            background: 'var(--card)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>E-Mail Postfach</h2>
              <button style={{
                background: 'var(--accent)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Verfassen
              </button>
            </div>
            
            <div>
              {emails.map(email => (
                <div key={email.id} style={{
                  background: 'rgba(255,255,255,0.02)',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '4px'
                      }}>
                        <span style={{ 
                          fontSize: '14px',
                          fontWeight: email.isRead ? 'normal' : 'bold'
                        }}>
                          {email.from}
                        </span>
                        {email.isStarred && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
                        {email.tags.map(tag => (
                          <span key={tag} style={{
                            background: 'rgba(79, 70, 229, 0.2)',
                            color: 'var(--accent)',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '11px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: email.isRead ? 'normal' : 'bold',
                        marginBottom: '4px'
                      }}>
                        {email.subject}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                        {email.preview}
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {email.timestamp.toLocaleDateString('de-DE')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
                    <button style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: 'none',
                      color: 'var(--text)',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <Share className="w-4 h-4" />
                    </button>
                    <button style={{
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: 'none',
                      color: '#ef4444',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : activeSection === 'analytics' ? (
          // New Analytics Section
          <div className="card" style={{
            background: 'var(--card)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Analytics & Insights</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: 'rgba(79, 70, 229, 0.1)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(79, 70, 229, 0.2)'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--accent)' }}>
                  Speicher-Analyse
                </h3>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                  2.1 GB
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  von 10 GB verwendet (21%)
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  marginTop: '8px'
                }}>
                  <div style={{
                    width: '21%',
                    height: '100%',
                    background: 'var(--accent)',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>

              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#22c55e' }}>
                  Dateien nach Typ
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>Dokumente:</span>
                    <span>{mediaFiles.filter(f => f.type === 'document').length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>Videos:</span>
                    <span>{mediaFiles.filter(f => f.type === 'video').length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>Archive:</span>
                    <span>{mediaFiles.filter(f => f.type === 'archive').length}</span>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#f59e0b' }}>
                  Häufigste Tags
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {/* Calculate most common tags */}
                  {(() => {
                    const tagCount = {};
                    mediaFiles.forEach(file => {
                      file.tags.forEach(tag => {
                        tagCount[tag] = (tagCount[tag] || 0) + 1;
                      });
                    });
                    return Object.entries(tagCount)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 4)
                      .map(([tag, count]) => (
                        <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span>{tag}:</span>
                          <span>{count}</span>
                        </div>
                      ));
                  })()}
                </div>
              </div>

              <div style={{
                background: 'rgba(168, 85, 247, 0.1)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(168, 85, 247, 0.2)'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#a855f7' }}>
                  Aktivität heute
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>Uploads:</span>
                    <span>3</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>Downloads:</span>
                    <span>7</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>E-Mails:</span>
                    <span>12</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tag Cloud */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Tag-Wolke</h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {(() => {
                  const tagCount = {};
                  mediaFiles.forEach(file => {
                    file.tags.forEach(tag => {
                      tagCount[tag] = (tagCount[tag] || 0) + 1;
                    });
                  });
                  const maxCount = Math.max(...Object.values(tagCount));
                  return Object.entries(tagCount)
                    .sort(([,a], [,b]) => b - a)
                    .map(([tag, count]) => {
                      const size = 10 + (count / maxCount) * 8;
                      const opacity = 0.5 + (count / maxCount) * 0.5;
                      return (
                        <span
                          key={tag}
                          style={{
                            fontSize: `${size}px`,
                            color: 'var(--accent)',
                            opacity: opacity,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onClick={() => {
                            setSearchQuery(tag);
                            setActiveSection('files');
                          }}
                        >
                          {tag}
                        </span>
                      );
                    });
                })()}
              </div>
            </div>
          </div>
        ) : activeSection === 'settings' ? (
          // New Settings Section
          <div className="card" style={{
            background: 'var(--card)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Einstellungen</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {/* Account Settings */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '16px',
                borderRadius: '8px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Account</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={userProfile?.name}
                    readOnly
                    style={{
                      width: '100%',
                      background: 'var(--bg)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={userProfile?.email}
                    readOnly
                    style={{
                      width: '100%',
                      background: 'var(--bg)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '4px' }}>
                    Organisation
                  </label>
                  <input
                    type="text"
                    value={userProfile?.organization}
                    readOnly
                    style={{
                      width: '100%',
                      background: 'var(--bg)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              {/* Display Settings */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '16px',
                borderRadius: '8px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Anzeige</h3>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>
                    Standard-Ansicht
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setViewMode('grid')}
                      style={{
                        background: viewMode === 'grid' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'var(--text)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Raster
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      style={{
                        background: viewMode === 'list' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'var(--text)',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Liste
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>
                    Standard-Sortierung
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="date">Datum</option>
                    <option value="name">Name</option>
                    <option value="size">Größe</option>
                    <option value="type">Typ</option>
                  </select>
                </div>
              </div>

              {/* Security Settings */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '16px',
                borderRadius: '8px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Sicherheit</h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px' }}>Zwei-Faktor-Authentifizierung</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#22c55e',
                      background: 'rgba(34, 197, 94, 0.2)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      Aktiv
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px' }}>OAuth-Verbindung</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#22c55e',
                      background: 'rgba(34, 197, 94, 0.2)',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      Verbunden
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px' }}>Letzte Anmeldung</span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      Heute, 09:15
                    </span>
                  </div>
                </div>
              </div>

              {/* Storage Management */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '16px',
                borderRadius: '8px'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Speicherverwaltung</h3>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px' }}>Verwendeter Speicher</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>2.1 GB / 10 GB</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '21%',
                      height: '100%',
                      background: 'var(--accent)',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <button style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: 'none',
                    color: '#ef4444',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                    Cache leeren
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        ) : null}
      </main>

      <footer style={{
        padding: '20px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '13px'
      }}>
        © 2025 Theodor von Haft — Go-Monster Enterprise Platform
      </footer>
    </div>
  );
};

export default CompactEnterprisePlatform;