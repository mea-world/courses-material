import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setAuthToken } from '@/lib/axiosInstance'; // Assuming this is the correct path

interface AuthModalProps {
  children: React.ReactNode; // To use a button or icon as a trigger
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function AuthModal({ children, isOpen, onOpenChange }: AuthModalProps) {
  const [tokenInput, setTokenInput] = useState('');

  const handleSaveToken = () => {
    setAuthToken(tokenInput);
    if (onOpenChange) {
      onOpenChange(false); // Close the modal after saving
    }
    setTokenInput(''); // Clear the input
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Authentication Token</DialogTitle>
          <DialogDescription>
            Paste your API token here. This will be stored in localStorage.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="token" className="text-right">
              Token
            </Label>
            <Input
              id="token"
              value={tokenInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenInput(e.target.value)}
              className="col-span-3"
              placeholder="Enter your API token"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSaveToken}>
            Save Token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 