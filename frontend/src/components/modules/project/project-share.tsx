import { toast } from "sonner";
import { useMemo, useState } from "react";
import { LoaderCircleIcon, Share2Icon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

import { ProjectShareFormData, useProjectShareForm } from "@/forms/project";
import { Project, SharedProject } from "@/types/project";
import { useGetProjectSharingApi } from "@/api/query/project";
import { useSearchUsersApi } from "@/api/query/user";
import {
  useCreateProjectSharingApi,
  useDeleteProjectSharingApi,
  useUpdateProjectSharingApi,
} from "@/api/mutation/project";

const permissions = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
];

export function ProjectShare({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

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

        <TooltipContent>Share Task List</TooltipContent>
      </Tooltip>

      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Share Task List</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <div className="space-y-4">
          <ProjectShareForm project={project} />
          <Separator />
          <ProjectSharingList project={project} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectShareForm({ project }: { project: Project }) {
  const form = useProjectShareForm();

  const { mutateAsync: shareProject, isPending } = useCreateProjectSharingApi(
    project.id
  );

  const onSubmit = (data: ProjectShareFormData) => {
    shareProject({
      user_ids: data.users.map((user) => user.value),
      permission: data.permission,
    })
      .then(() => {
        form.reset();
        toast.success("Task list shared");
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
            name="permission"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroup
                    className="flex w-full"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    {permissions.map((perm) => (
                      <FormItem
                        key={perm.value}
                        className="relative w-full h-10 flex items-center gap-2 rounded-lg border border-input px-3 space-y-0 shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={perm.value}
                            className="after:absolute after:inset-0"
                          />
                        </FormControl>
                        <FormLabel>{perm.label}</FormLabel>
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

function ProjectSharingList({ project }: { project: Project }) {
  const { data: projectSharingList } = useGetProjectSharingApi(project.id);

  return (
    <div className="space-y-3">
      <div className="font-medium">Shared with</div>

      <div className="space-y-2">
        {projectSharingList?.map((sharing) => (
          <ProjectSharingCard key={sharing.id} sharing={sharing} />
        ))}
      </div>
    </div>
  );
}

function ProjectSharingCard({ sharing }: { sharing: SharedProject }) {
  return (
    <Card key={sharing.id} className="shadow-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between p-4 gap-4">
        <div className="flex flex-col">
          <CardTitle>{sharing.user.username}</CardTitle>
          <CardDescription>{sharing.user.email}</CardDescription>
        </div>

        <div className="flex space-x-4">
          <TogglePermission sharing={sharing} />
          <RemoveSharingButton sharing={sharing} />
        </div>
      </div>
    </Card>
  );
}

function TogglePermission({ sharing }: { sharing: SharedProject }) {
  const [permission, setPermission] = useState(sharing.permission);

  const { mutateAsync: togglePermission, isPending } =
    useUpdateProjectSharingApi(sharing.project.id, sharing.id);

  const handelPermissionChange = (value: string) => {
    togglePermission({ permission: value }).then(() => setPermission(value));
  };

  return (
    <RadioGroup
      className="flex"
      defaultValue={permission}
      onValueChange={handelPermissionChange}
      disabled={isPending}
    >
      {permissions.map((perm) => (
        <label
          key={perm.value}
          className="relative cursor-pointer h-8 flex items-center rounded-lg border border-input px-3 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
        >
          <RadioGroupItem
            id={perm.value}
            value={perm.value}
            className="hidden after:absolute after:inset-0"
          />

          <p className="text-sm font-medium leading-none text-foreground">
            {perm.label}
          </p>
        </label>
      ))}
    </RadioGroup>
  );
}

function RemoveSharingButton({ sharing }: { sharing: SharedProject }) {
  const { mutateAsync: removeSharing, isPending } = useDeleteProjectSharingApi(
    sharing.project.id,
    sharing.id
  );

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon"
          variant="secondary"
          className="w-auto px-3 sm:px-0 sm:w-8 rounded-full"
          disabled={isPending}
          onClick={() =>
            removeSharing()
              .then(() => toast.success("Task list sharing removed"))
              .catch(() => toast.error("Failed to remove sharing"))
          }
        >
          <XIcon />
          <span className="flex sm:hidden">Remove</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>Remove Sharing</TooltipContent>
    </Tooltip>
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

  const { data: projectSharing, isLoading: isProjectSharingLoading } =
    useGetProjectSharingApi(project.id);

  const options = useMemo(() => {
    if (!users) return [];

    const projectSharingList = projectSharing
      ? projectSharing.map((share) => share.user.id)
      : [];

    return users
      .filter((user) => !projectSharingList.includes(user.id))
      .map((user) => {
        return { value: user.id, label: user.username } as unknown as Option;
      });
  }, [projectSharing, users]);

  const isLoading = isUsersLoading || isProjectSharingLoading;

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
