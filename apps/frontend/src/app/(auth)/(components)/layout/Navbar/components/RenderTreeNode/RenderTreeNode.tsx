import { Group, type RenderTreeNodePayload } from '@mantine/core';
import { IconBooks, IconChevronDown } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils/constants';

export const RenderTreeNode = ({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree
}: RenderTreeNodePayload) => {
  const router = useRouter();

  return (
    <Group gap='xs' {...elementProps}>
      <Group
        align='center'
        gap='xs'
        mb='xs'
        onClick={() => {
          if (hasChildren) return tree.toggleExpanded(node.value);

          router.push(`${ROUTES.DOCUMENTS}/${node.value}`);
        }}
      >
        {hasChildren && <IconBooks size={16} />}
        <span>{node.label}</span>
        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </Group>
    </Group>
  );
};
