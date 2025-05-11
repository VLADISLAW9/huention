import type { TreeNodeData } from '@mantine/core';

import { useToggle } from '@mantine/hooks';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { getCollections } from '@/utils/api/requests';
import { ROUTES } from '@/utils/constants';
import { useBoolean, useMount } from '@/utils/hooks';

export const useNavbar = () => {
  const [collectionItems, setCollectionItems] = useState<TreeNodeData[]>([]);
  const [showAddCollectionField, toggleShowAddCollectionField] = useBoolean();

  const navLinks = [
    {
      label: 'Главная',
      component: Link,
      href: ROUTES.HOME,
      px: 'lg',
      py: 'md',
      leftSection: <IconHome size={18} />
    }
  ];

  useMount(() => {
    (async () => {
      const getCollectionsResponse = await getCollections();

      const collectionItems: TreeNodeData[] = getCollectionsResponse.data.collections.map(
        (collection) => ({
          label: collection.name,
          value: String(collection.id),
          children: collection.documents.map((document) => ({
            label: document.name,
            value: String(document.id)
          }))
        })
      );

      setCollectionItems(collectionItems);
    })();
  });

  return {
    functions: { toggleShowAddCollectionField },
    state: { navLinks, collectionItems, showAddCollectionField }
  };
};
