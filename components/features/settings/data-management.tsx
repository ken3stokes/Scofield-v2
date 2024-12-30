"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { exportData } from '@/lib/data-export';
import { importData } from '@/lib/data-import';
import { useToast } from '@/hooks/use-toast';

export function DataManagement() {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      await exportData();
      toast({
        title: "Export Successful",
        description: "Your data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      await importData(file);
      toast({
        title: "Import Successful",
        description: "Your data has been imported successfully.",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      <div>
        <input
          type="file"
          accept=".json"
          className="hidden"
          id="import-file"
          onChange={handleImport}
          disabled={isImporting}
        />
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => document.getElementById('import-file')?.click()}
          disabled={isImporting}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isImporting ? 'Importing...' : 'Import Data'}
        </Button>
      </div>
    </div>
  );
}