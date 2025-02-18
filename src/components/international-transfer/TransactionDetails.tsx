
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TransactionDetailsProps {
  recipientId: string;
  description: string;
  onRecipientIdChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const TransactionDetails = ({
  recipientId,
  description,
  onRecipientIdChange,
  onDescriptionChange,
}: TransactionDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="recipientId">Recipient ID</Label>
        <Input
          id="recipientId"
          value={recipientId}
          onChange={(e) => onRecipientIdChange(e.target.value)}
          placeholder="Enter recipient's ID"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="What's this transfer for?"
        />
      </div>
    </div>
  );
};
