import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CompleteTodoItemRequest, CompleteTodoItemRequestSchema, TodoItem } from "@/schema/todo";
import { useCompleteTodoItem } from "@/hooks/use-todo";

interface CompleteTodoDialogProps {
  todo: TodoItem;
}

export function CompleteTodoDialog({ todo }: CompleteTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: completeTodo, isPending } = useCompleteTodoItem();

  const form = useForm<CompleteTodoItemRequest>({
    resolver: zodResolver(CompleteTodoItemRequestSchema),
    defaultValues: {
      todoID: todo.todoID,
      completionDate: format(new Date(), "yyyy-MM-dd"), // Default to today
      completionNotes: todo.completionNotes || "",
    },
  });

  const onSubmit = (values: CompleteTodoItemRequest) => {
    completeTodo(values, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-green-600" disabled={!!todo.completionDate}>
          <CheckCheck className="h-4 w-4" />
          <span className="sr-only">Mark Complete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Todo as Complete</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to mark "<strong>{todo.todoTitle}</strong>" as complete?
            </p>
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Completion Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completionNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notes about completion..." {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Completing..." : "Confirm Complete"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}