import styles from '../../styles/Cards.module.scss'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Select,
  Button,
  Grid,
  Box,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageUploader from '../ImageUploader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { createCard } from '../../firebase/firestore'

const TextInput = React.forwardRef(function TextInput(props, ref) {
  return (
    <FormControl id={props.id} isInvalid={props.errors[props.id]}>
      <Textarea
        id={props.id}
        placeholder={props.label}
        _placeholder={{ fontSize: 'xl' }}
        {...props}
        ref={ref}
        h={'44vh'}
        maxH={'44vh'}
      />
      <FormErrorMessage>{props.errors[props.id]?.message}</FormErrorMessage>
    </FormControl>
  )
})

export default function CardForm() {
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  // const [cardFace, setCardFace] = useState('front')
  const router = useRouter()
  const { deckId } = router.query
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    data.back = 'asdasd'
    toast
      .promise(createCard(deckId, data), {
        loading: <b>Creating card...</b>,
        success: <b>Card created!</b>,
        error: <b>Could not create.</b>,
      })
      .then(() => {
        reset({ front: '', back: '', type: 'basic' })
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        py={16}
        px={8}
        h="64vh"
        className={triggerAnimation ? styles.fade_in : ''}
        onAnimationEnd={() => setTriggerAnimation(false)}
        // overflow={'auto'}
      >
        <TextInput
          {...register('cardFace', {
            required: 'front is required',
            maxLength: { value: 1500, message: 'Max length is 1500 char' },
          })}
          errors={errors}
          label={'Start writing'}
          id="front"
        />
      </Box>
      {/* <Divider width="100%" borderWidth="2px" /> */}
      <Grid mx={8} gap={4} templateColumns={'repeat(4, 1fr)'}>
        <FormControl>
          <FormLabel htmlFor="type">Type: </FormLabel>
          <Select id="type" {...register('type')}>
            <option value="basic">Basic</option>
            <option value="Perfect">Perfect</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">Image: </FormLabel>
          <ImageUploader setError={setError} clearErrors={clearErrors} />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>
        {/* <GridItem alignSelf="end" colSpan={2}> */}
        <Button colorScheme="main" alignSelf="end">
          Show Back
        </Button>
        <Button colorScheme="main" type="submit" alignSelf="end">
          Create
        </Button>
      </Grid>
      {/* <TextInput
            {...register('back', {
              required: 'back is required',
              maxLength: { value: 1500, message: 'Max length is 1500 char' },
            })}
            errors={errors}
            label="Back"
            id="back"
          /> */}

      {/* </GridItem> */}
    </form>
  )
}
