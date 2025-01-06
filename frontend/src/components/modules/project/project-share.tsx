import { toast } from "sonner";
import { useMemo, useState } from "react";
import { CheckIcon, LoaderCircleIcon, Share2Icon, XIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleSelector, Option } from "@/components/ui/multiple-selector";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { ProjectShareFormData, useProjectShareForm } from "@/forms/project";
import { Project, ProjectUser } from "@/types/project";
import { useGetProjectUsersApi } from "@/api/query/project";
import { useSearchUsersApi } from "@/api/query/user";
import {
  useShareProjectApi,
  useDeleteProjectUserApi,
  useUpdateProjectUserApi,
} from "@/api/mutation/project";

const roles = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
];

export function ProjectShare({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  function ChangeRoleButton({ contributor }: { contributor: ProjectUser }) {
    const [role, setRole] = useState(contributor.role);

    const { mutateAsync: changeRole, isPending } = useUpdateProjectUserApi(
      project.id,
      contributor.id
    );

    const handelRoleChange = (value: string) => {
      changeRole({ role: value }).then(() => setRole(value));
    };

    return (
      <RadioGroup
        className="flex"
        defaultValue={role}
        onValueChange={handelRoleChange}
        disabled={isPending}
      >
        {roles.map((role) => (
          <label
            key={role.value}
            className="relative cursor-pointer h-8 flex items-center rounded-lg border border-input px-3 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
          >
            <RadioGroupItem
              id={role.value}
              value={role.value}
              className="hidden after:absolute after:inset-0"
            />

            <p className="text-sm font-medium leading-none text-foreground">
              {role.label}
            </p>
          </label>
        ))}
      </RadioGroup>
    );
  }

  function RemoveButton({ contributor }: { contributor: ProjectUser }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const { mutateAsync: removeSharing, isPending } = useDeleteProjectUserApi(
      project.id,
      contributor.id
    );

    const onSubmit = () => {
      removeSharing()
        .then(() => toast.success("Task list sharing removed"))
        .catch(() => toast.error("Failed to remove sharing"));
    };

    return (
      <div>
        {isDeleting ? (
          <div
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "gap-1 p-1 rounded-full"
            )}
          >
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-none size-7 text-orange-500"
              disabled={isPending}
              onClick={onSubmit}
            >
              {isPending ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <CheckIcon />
              )}
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-none size-7"
              disabled={isPending}
              onClick={() => setIsDeleting(false)}
            >
              <XIcon />
            </Button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant="secondary"
                className="w-auto px-3 sm:px-0 sm:w-8 rounded-full"
                disabled={isPending}
                onClick={() => setIsDeleting(true)}
              >
                <XIcon />
                <span className="flex sm:hidden">Remove</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove Sharing</TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }

  function ProjectContributorCard({
    contributor,
  }: {
    contributor: ProjectUser;
  }) {
    return (
      <Card key={contributor.id} className="shadow-none">
        <div className="flex flex-wrap items-center justify-between p-4 gap-4">
          <div className="flex flex-col">
            <CardTitle>{contributor.username}</CardTitle>
            <CardDescription>{contributor.email}</CardDescription>
          </div>

          <div className="flex items-center space-x-4">
            {contributor.permissions.can_update && (
              <ChangeRoleButton contributor={contributor} />
            )}

            {contributor.permissions.can_delete && (
              <RemoveButton contributor={contributor} />
            )}
          </div>
        </div>
      </Card>
    );
  }

  function ProjectUserList() {
    const { data: contributors } = useGetProjectUsersApi(project.id);
    if (!contributors) return null;

    return (
      <div className="space-y-3">
        <div className="font-medium text-sm">Contributors</div>

        <div className="space-y-2">
          {contributors.map((contributor) => (
            <ProjectContributorCard
              key={contributor.id}
              contributor={contributor}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <Share2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Share</TooltipContent>
      </Tooltip>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-xl"
      >
        <DialogHeader>
          <DialogTitle>Share Task List</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <ProjectShareForm project={project} />
          <Separator />
          <ProjectUserList />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectShareForm({ project }: { project: Project }) {
  const form = useProjectShareForm();

  const { mutateAsync: shareProject, isPending } = useShareProjectApi(
    project.id
  );

  const onSubmit = (data: ProjectShareFormData) => {
    shareProject({
      user_ids: data.users.map((user) => user.value),
      role: data.role,
    })
      .then(() => {
        form.reset();
        toast.success("Task list shared successfully");
      })
      .catch(() => toast.error("Failed to share task list"));
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <UsersSelector
                  project={project}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroup
                    className="flex w-full"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {roles.map((role) => (
                      <FormItem
                        key={role.value}
                        className="relative w-full h-10 flex items-center gap-2 rounded-lg border border-input px-3 space-y-0 shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={role.value}
                            className="after:absolute after:inset-0"
                          />
                        </FormControl>
                        <FormLabel>{role.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            disabled={!form.getValues("users")?.length || isPending}
          >
            {isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <Share2Icon />
            )}
            <span>Share Task List</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

function UsersSelector({
  project,
  ...props
}: {
  project: Project;
  value: Option[];
  onChange: (options: Option[]) => void;
}) {
  const [search, setSearch] = useState("");

  const { data: users, isLoading: isUsersLoading } = useSearchUsersApi(search, {
    enabled: !!search,
  });

  const { data: projectUsers, isLoading: isProjectUsersLoading } =
    useGetProjectUsersApi(project.id);

  const options = useMemo(() => {
    if (!users) return [];

    const contributors = projectUsers
      ? projectUsers.map((user) => user.id)
      : [];

    return users
      .filter((user) => !contributors.includes(user.id))
      .map((user) => {
        return { value: user.id, label: user.username } as unknown as Option;
      });
  }, [projectUsers, users]);

  const isLoading = isUsersLoading || isProjectUsersLoading;

  return (
    <MultipleSelector
      commandProps={{ label: "Select users" }}
      options={options}
      isLoading={isLoading}
      onSearch={(value) => setSearch(value)}
      placeholder="Select users"
      emptyIndicator="No users found"
      loadingIndicator="Searching..."
      {...props}
    />
  );
}
