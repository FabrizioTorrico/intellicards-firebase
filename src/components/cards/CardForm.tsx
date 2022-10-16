import styles from '../../styles/Animations.module.scss'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Button,
  Box,
  Text,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageUploader from '../ImageUploader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import {
  useForm,
  Controller,
  Resolver,
  FieldErrorsImpl,
  Control,
} from 'react-hook-form'
import { createCard } from '../../database/firestore'
import MarkDown from '../MarkDown'
import MarkdownInput from '../MarkdownInput'
import { Card } from '@models/cards'

interface FormValues extends Card {
  id?: string
  image?: string
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {}
  !values.front?.trim() && (errors['front'] = { message: 'Front is required' })
  !values.back?.trim() && (errors['back'] = { message: 'Back is required' })

  return {
    values,
    errors,
  }
}

interface CardFaceProps {
  errors: FieldErrorsImpl<FormValues>
  id: 'front' | 'back'
  getValues: (x: string) => FormValues
  curFace: string
  preview: boolean
  control: Control<FormValues>
}

function CardFace(props: CardFaceProps) {
  const error = props.errors.front?.message || props.errors.back?.message
  return (
    <FormControl
      id={props.id}
      isInvalid={!!error}
      hidden={props.id !== props.curFace}
    >
      <Box
        mt={16}
        pb={2}
        pr={24}
        pl={4}
        h="52vh"
        overflow={'auto'}
        hidden={!props.preview}
      >
        <MarkDown>{props.getValues(props.id) || 'Nothing here'}</MarkDown>
      </Box>

      <Controller
        name={props.id}
        control={props.control}
        rules={{
          required: `${
            props.id[0].toUpperCase() + props.id.substring(1)
          } is required.`,
        }}
        render={({ field }) => {
          return (
            <Box hidden={props.preview}>
              <MarkdownInput value={field.value} onChange={field.onChange} />
            </Box>
          )
        }}
      />

      <FormErrorMessage mt="-1.5rem">{error}</FormErrorMessage>
    </FormControl>
  )
}

export default function CardForm() {
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  const [curFace, setCurFace] = useState('front')
  const [preview, setPreview] = useState(false)
  const previewStyleText = {
    color: 'main.500',
    borderBottom: '2px solid transparent',
    borderColor: 'main.500',
  }
  const router = useRouter()
  const { deckId } = router.query
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver })

  const changeFace = () =>
    setCurFace((curFace) => (curFace === 'front' ? 'back' : 'front'))

  const onSubmit = async (data) => {
    toast
      .promise(createCard(deckId, data), {
        loading: <b>Creating card...</b>,
        success: <b>Card created!</b>,
        error: <b>Could not create.</b>,
      })
      .then(() => {
        reset({ front: '', back: '', type: 'basic' })
      })
      .catch(() => null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        position="relative"
        h="68vh"
        pt={4}
        px={8}
        className={triggerAnimation ? styles.fade_in : ''}
        onAnimationEnd={() => setTriggerAnimation(false)}
      >
        <Flex
          gap={8}
          position="absolute"
          right={'3.5rem'}
          top="1rem"
          zIndex="30"
        >
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(!preview ? previewStyleText : {})}
            onClick={() => setPreview(false)}
          >
            {curFace[0].toUpperCase() + curFace.substring(1)} text
          </Text>
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(preview ? previewStyleText : {})}
            onClick={() => setPreview(true)}
          >
            Preview
          </Text>
        </Flex>

        {(['front', 'back'] as const).map((face) => (
          <CardFace
            key={face}
            errors={errors}
            id={face}
            getValues={getValues}
            curFace={curFace}
            preview={preview}
            control={control}
          />
        ))}
      </Box>

      <SimpleGrid mx={8} gap={4} columns={{ base: 2, md: 4 }}>
        <FormControl>
          <FormLabel htmlFor="type">Type: </FormLabel>
          <Select id="type" {...register('type')}>
            <option value="basic">Basic</option>
            <option value="Perfect">Perfect</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.image}>
          <FormLabel htmlFor="image">Image: </FormLabel>
          <ImageUploader setError={setError} clearErrors={clearErrors} />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>
        {/* <GridItem alignSelf="end" colSpan={2}> */}
        <Button colorScheme="main" alignSelf="end" onClick={changeFace}>
          Show {curFace === 'front' ? 'Back' : 'Front'}
        </Button>
        <Button colorScheme="main" type="submit" alignSelf="end">
          Create
        </Button>
      </SimpleGrid>
    </form>
  )
}
