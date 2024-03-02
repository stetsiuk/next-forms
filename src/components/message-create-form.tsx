"use client";

import { useState } from "react";
import { useFormState } from 'react-dom';

import { useToastMessage } from "@/hooks/use-toast-message";
import { useFormReset } from "@/hooks/use-form-reset";
import { createMessage } from '@/app/actions';
import { SubmitButton } from "@/components/submit-button";
import { FieldError } from "@/components/field-error";
import { EMPTY_FORM_STATE } from "@/utils/handle-form-error";


const MessageCreateForm = () => {
	const [date, setDate] = useState(new Date());

	const [formState, action] = useFormState(
		createMessage.bind(null, date.toISOString()),
		EMPTY_FORM_STATE
	);

	const noScriptFallback = useToastMessage(formState);
	const formRef = useFormReset(formState);

	const handleCreateTicket = async (formData: FormData) => {
		await action(formData);

		if (formRef.current) {
			formRef.current.reset();
		}
	};

	return (
		<form
			ref={formRef}
			action={handleCreateTicket}
			className="flex flex-col gap-y-2"
		>
			<label htmlFor="title">Title</label>
			<input id="title" name="title" className="border-2"/>

			<FieldError formState={formState} name="title"/>

			<label htmlFor="text">Text</label>
			<textarea id="text" name="text" className="border-2"/>

			<FieldError formState={formState} name="text"/>

			<label>Date</label>
			<p suppressHydrationWarning>{date.toLocaleString()}</p>

			<SubmitButton label="Create" loading="Creating ..."/>

			{noScriptFallback}

			<span className="font-bold">{formState.message}</span>
		</form>
	);
};

export { MessageCreateForm };
