'use client';

import { Card, CardHeader, CardBody } from "@nextui-org/react"; // Corrected import for consistency
import { Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

interface PageTmpCardProps {
  subtitle: string;
}

export const PageTmpCard: React.FC<PageTmpCardProps> = ({ subtitle }) => {
      return (
	<Card
	  shadow="lg"
	  className="bg-secondary-200"
	>
	  <CardHeader className="items-start space-x-3">
		<Spinner
		  size="sm"
		  color="warning"
		/>
		<p className="text-italic font-thin text-warning">
		  in progress
		</p>
	  </CardHeader>

	  <Divider />

	  <CardBody className="p-9">
		<p>{subtitle}</p>
	  </CardBody>
	</Card>
  );
}
