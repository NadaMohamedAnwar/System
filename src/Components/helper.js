// Format bytes to human-readable size
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  // Get file icon based on MIME type
  export function getFileIconByType(type) {
    if (type.includes('image')) return 'image';
    if (type.includes('pdf')) return 'file-text';
    if (type.includes('spreadsheet') || type.includes('excel')) return 'table';
    if (type.includes('wordprocessing') || type.includes('document')) return 'file-text';
    if (type.includes('presentation') || type.includes('powerpoint')) return 'presentation';
    if (type.includes('text')) return 'file-text';
    if (type.includes('zip') || type.includes('compressed')) return 'archive';
    return 'file';
  }
  
  // Get folder children
  export function getFolderChildren(folders, parentId) {
    return folders.filter(folder => folder.parentId === parentId);
  }
  
  // Get folder path
  export function getFolderPath(folders, folderId) {
    if (!folderId) return [];
  
    const result = [];
    let currentFolder = folders.find(f => f.id === folderId);
  
    while (currentFolder) {
      result.unshift(currentFolder);
      currentFolder = currentFolder.parentId
        ? folders.find(f => f.id === currentFolder.parentId)
        : null;
    }
  
    return result;
  }
  
  // Get documents in folder
  export function getDocumentsInFolder(documents, folderId) {
    return documents.filter(doc => doc.folderId === folderId);
  }
  
  // Sort documents
  export function sortDocuments(documents, options) {
    return [...documents].sort((a, b) => {
      let comparison = 0;
  
      switch (options.by) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
      }
  
      return options.order === 'asc' ? comparison : -comparison;
    });
  }
  
  // Format date in a human-readable format
  export function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  // Generate a breadcrumb array from folder path
  export function generateBreadcrumbs(folders, currentFolderId) {
    return getFolderPath(folders, currentFolderId);
  }
  
  // Check if a folder has subfolders
  export function hasFolderChildren(folders, folderId) {
    return folders.some(folder => folder.parentId === folderId);
  }
  
  // Get folder depth level
  export function getFolderDepth(folders, folderId) {
    let depth = 0;
    let currentFolder = folders.find(f => f.id === folderId);
  
    while (currentFolder && currentFolder.parentId) {
      depth++;
      currentFolder = folders.find(f => f.id === currentFolder.parentId);
    }
  
    return depth;
  }
  